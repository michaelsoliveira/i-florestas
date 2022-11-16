import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useCallback, useContext, useEffect, forwardRef , useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { create } from '../../store/userSlice'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css';
import alertService from '../../services/alert'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AuthContext } from 'contexts/AuthContext';
import { Select, OptionType } from '../Select';
import RadioGroup from '../Form/RadioGroup';
import Option from '../Form/Option';
import FocusError from '../Form/FocusError';

type AddEditType = {
    styles?: any;
    userId?: string;
    redirect?: boolean
    projetoId?: string;
    sendForm?: any;
    roles?: any[]
    users?: any[]
}

export const AddEdit = forwardRef<any, AddEditType>(
    function AddEdit(
      { styles, userId, sendForm, redirect, projetoId, roles, users}, 
      ref
    ) {
        const dispatch = useAppDispatch()
        const router = useRouter()
        const isAddMode = !userId
        const { client } = useContext(AuthContext)
        const [selectedUser, setSelectedUser] = useState<any>()
        const [selectedRole, setSelectedRole] = useState<any>()
        const [option, setOption] = useState<number | undefined>(0)
        const { data: session } = useSession()
        function onSelect(index: number) {
            setOption(index)
        }

        const loadRolesOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
            const response = await client.get(`/role/search?nome=${inputValue}`)
            const json = response.data
            
            callback(json?.map((role: any) => ({
                value: role.id,
                label: role.name
            })))
        }

        const loadUsersOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
            const response = await client.get(`/users/search?nome=${inputValue}`)
            const json = response.data
            
            callback(json?.map((user: any) => ({
                value: user.id,
                label: user.username
            })))
        }

        function getUsersDefaultOptions() {
            return users?.map((user: any) => {
                return {
                    label: user.username,
                    value: user.id
                }
            })
        }

        function getRolesDefaultOptions() {
            return roles?.map((role: any) => {
                return {
                    label: role.name,
                    value: role.id
                }
            })
        }

        const validationSchema = Yup.object().shape({
            isAddMode: Yup.boolean(),
            username: Yup.string()
            .when('option', {
                is: (option:any) => option===0,
                then: Yup.string().test(
                    "len",
                    "O nome de usuário tem que ter entre 3 e 20 caracteres.",
                    (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
                )
                .required("Campo obrigatório!")
            })
            ,
            email: Yup.string()
            .when('option', {
                is: (option:any) => option===0,
                then: Yup.string()
                    .email("Este não é um email válido.")
                    .required("Campo obrigatório!")
            }),
            password:
                Yup.string()
                .when('option', {
                    is: (option:any) => option===0,
                    then: Yup.string()
                    .when('isAddMode', {
                        is: true,
                        then: Yup.string().required('Password is required').min(6, 'A senha deve possuir no mínimo 6 caracteres')
                    })
                }),
                
            confirmPassword: Yup.string()
                .when('option', {
                    is: (option:any) => option===0,
                    then: Yup.string()
                    .when('password', (password, schema) => {
                        if (password || isAddMode) return schema.required('A confirmação de senha é obrigatória')
                    })
                    .oneOf([Yup.ref('password')], 'As senhas informadas não coincidem')
                }),
            id_user: Yup.string()
                .when('option', {
                    is: (option:any) => option===1,
                    then: Yup.string()
                    .when('isAddMode', {
                        is: true,
                        then: Yup.string().required('É necessário selecionar um usuário')
                    }) 
                }),
            id_role: Yup.string()
                .required('É necessário selecionar um grupo de usuário')
            });

        async function handleRegister(data: any) {
            if (isAddMode) {
                await dispatch(create(data))
                .unwrap()
                    .then(async () => {

                        if (redirect) {
                            const { email, password } = data
                    
                            const res = await signIn('credentials', {
                            redirect: false,
                            email,
                            password,
                            // callbackUrl: `${window.location.origin}`,
                            }).then((response: any) => {
                                if (response.ok) {
                                    alertService.success('Login realizado com sucesso')
                                    router.push('/')
                                } else {
                                    alertService.warn('Email ou senha inválidos, verifique os dados e tente novamente!')
                                }
                                
                            }).catch ((e) => {
                                console.log(e)
                            })
                        } else {
                            alertService.success('Usuário cadastrado com SUCESSO!')
                            sendForm()
                        }
                })
                .catch((error: any) => {
                    alertService.warn(`Error: ${error.message}`)
                });
            } else {
                await client.put(`/users/${userId}`, data)
                    .then((response: any) => {
                        const { error, user, message } = response.data
                        
                        if (error) {
                            alertService.error(message)
                        } else {
                            alertService.success(message)
                            sendForm()
                            // hideModal()
                        }
                    })
            }    
        }

        interface Values {
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
            provider: string;
            id_provider: string;
            isAddMode: boolean;
            id_user: string;
            id_projeto: string;
            id_role: string;
            option: number;
        }
        
        return (
            <div>
                <Formik
                    innerRef={ref}
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        provider: '',
                        id_provider: '',
                        isAddMode,
                        id_user: '',
                        id_projeto: '',
                        id_role: '',
                        option: 0
                    }}
                    validationSchema={validationSchema}
                    onSubmit={ (
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        handleRegister(values)
                    }}
                >
                    {({ errors, touched, isSubmitting, setFieldValue, setFieldTouched, setTouched, values }) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const loadUser = useCallback(async () => {
                            if (!isAddMode) {
                                
                                await client.get(`/users/${projetoId}/${userId}`)
                                    .then(({ data }: any) => {
                                        setSelectedRole({
                                            label: data?.roles[0].name,
                                            value: data?.roles[0].id
                                        })
                                        const fields = ['username', 'email'];
                                        setFieldValue('id_role', data?.roles[0].id)
                                        setFieldValue('id_projeto', projetoId)
                                        setFieldValue('id_user', data?.id)
                                        setTouched({}, false)
                                        fields.forEach(field => setFieldValue(field, data[field], false));
                                    });
                            }
                        }, [setFieldValue, setTouched])

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            loadUser()
                        }, [loadUser, values]);
                        
                        return (
                            <div className="flex flex-col justify-center w-full">
                                <div className="relative h-full mx-0">
                                    <div className="relative pt-3 px-4 w-full">
                                        <Form>
                                        {session && isAddMode && (
                                            <div className="mx-auto px-5 py-4">
                                            <RadioGroup>
                                                {["Cadastrar", "Selecionar"].map((el, index) => (
                                                    <Option
                                                        key={index}
                                                        index={index}
                                                        selectedIndex={option}
                                                        onSelect={(index: any) => {
                                                            setTouched({}, false)
                                                            setFieldValue('option', index)
                                                            onSelect(index)
                                                        }}
                                                    >
                                                        {el}
                                                    </Option> 
                                                ))}
                                            </RadioGroup>
                                        </div>
                                        )}
                            {(option === 0) ? (
                                 <div>
                                    <label className={styles.label} htmlFor="username">Nome</label>
                                    <Field className={styles.field} id="username" name="username" placeholder="Michael" />
                                    <ErrorMessage className='text-sm text-red-500 mt-1' name="username" component="div" />

                                    <label className={styles.label} htmlFor="emailRegister">Email</label>
                                    <Field
                                        className={styles.field}
                                        id="emailRegister"
                                        name="email"
                                        placeholder="john@acme.com"
                                        type="email"
                                    />
                                    <ErrorMessage className='text-sm text-red-500 mt-1' name="email" component="div" />
                                    {isAddMode && (
                                        <>
                                            <div>
                                                <label className={styles.label} htmlFor="password">Senha</label>
                                                <Field
                                                    type="password"
                                                    className={styles.field}
                                                    id="passwordRegister"
                                                    name="password"
                                                    placeholder="******"
                                                />
                                                <ErrorMessage className='text-sm text-red-500 mt-1' name="password" component="div" />
                                            </div>
                                            <div>
                                                <label className={styles.label} htmlFor="password">Confirmar a Senha</label>
                                                <Field
                                                    type="password"
                                                    className={styles.field}
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    placeholder="******"
                                                />
                                                <ErrorMessage className='text-sm text-red-500 mt-1' name="confirmPassword" component="div" />
                                            </div>
                                        </>
                                    )}
                                    
                                    </div>
                            ) : 
                            (<div>
                             
                                    <div className='py-4'>
                                        <Field name="id_user">
                                            {() => (
                                                <Select
                                                    initialData={
                                                        {
                                                            label: 'Entre com as iniciais...',
                                                            value: ''
                                                        }
                                                    }
                                                    selectedValue={selectedUser}
                                                    defaultOptions={getUsersDefaultOptions()}
                                                    options={loadUsersOptions}
                                                    label="Pesquisar Usuário"
                                                    callback={(value) => { 
                                                        setFieldValue('id_user', value?.value)
                                                        setSelectedUser(value) 
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="id_user" component="div" />
                                    </div>
                             
                            </div>
                        )}
                        {session && 
                        (<div>
                            <div className='py-4'>
                                <Field name="id_user">
                                                {() => (
                                    <Select
                                        initialData={
                                            {
                                                label: 'Entre com as iniciais...',
                                                value: ''
                                            }
                                        }
                                        selectedValue={selectedRole}
                                        defaultOptions={getRolesDefaultOptions()}
                                        options={loadRolesOptions}
                                        label="Grupo de Usuário"
                                        callback={(value) => { 
                                            setFieldValue('id_role', value?.value)
                                            setSelectedRole(value) 
                                        }}
                                    />
                                    )}
                                </Field>
                                <ErrorMessage className='text-sm text-red-500 mt-1' name="id_role" component="div" />
                            </div>
                        </div>
                        ) }
                        <FocusError />
                        </Form>
                    </div>
                </div>
            </div>)}}
        </Formik>
            
        </div>
    )
})