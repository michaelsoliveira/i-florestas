import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useCallback, useContext, useEffect, forwardRef , useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { create } from '../../store/userSlice'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css';
import alertService from '../../services/alert'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AuthContext } from 'contexts/AuthContext';
import { Select, OptionType } from '../Select';
import { GetServerSideProps } from 'next';

type AddEditType = {
    styles?: any;
    userId?: string;
    redirect?: boolean
    projetoId?: string;
    sendForm?: any;
    roles?: any[]
}

export const AddEdit = forwardRef<any, AddEditType>(
    function AddEdit(
      { styles, userId, sendForm, redirect, projetoId, roles}, 
      ref
    ) {
        const dispatch = useAppDispatch()
        const router = useRouter()
        const isAddMode = !userId
        const { client } = useContext(AuthContext)
        const [selectedRole, setSelectedRole] = useState<any>()

        const loadOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
            const response = await client.get(`/role/search/q?nome=${inputValue}`)
            const json = response.data
            
            callback(json?.map((role: any) => ({
                value: role.id,
                label: role.name
            })))
        }

        function getRolesDefaultOptions() {
            return roles?.map((role: any) => {
                return {
                    label: role.name,
                    value: role.id
                }
            })
        }

        const selectRole = (data: any) => {
            // const selectedRole = roles.find((role: any) => role.id === data.value)
            setSelectedRole(data)
            // setProjetoLocal(data)
        }

        const validationSchema = Yup.object().shape({
            isAddMode: Yup.boolean(),
            username: Yup.string()
            .test(
                "len",
                "O nome de usuário tem que ter entre 3 e 20 caracteres.",
                (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
            )
            .required("Campo obrigatório!"),
            email: Yup.string()
            .email("Este não é um email válido.")
            .required("Campo obrigatório!"),
            password:
                Yup.string()
                .when('isAddMode', {
                    is: true,
                    then: Yup.string().required('Password is required').min(6, 'A senha deve possuir no mínimo 6 caracteres')
                }),
                
            confirmPassword: Yup.string()
                .when('password', (password, schema) => {
                    if (password || isAddMode) return schema.required('A confirmação de senha é obrigatória')
                })
                .oneOf([Yup.ref('password')], 'As senhas informadas não coincidem')
        });

        async function handleRegister(data: any) {
            
            const preparedData = {
                ...data,
                id_role: selectedRole?.value,
                projetoId
            }

            if (isAddMode) {
                await dispatch(create(preparedData))
                .unwrap()
                    .then(async (responseData) => {

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
                console.log(preparedData)
                await client.put(`/users/${userId}`, preparedData)
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
                        isAddMode
                    }}
                    validationSchema={validationSchema}
                    onSubmit={ (
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        handleRegister(values)
                    }}
                >
                    {({ errors, touched, isSubmitting, setFieldValue, submitForm }) => {

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const loadUser = useCallback(async () => {
                            if (!isAddMode) {
                                
                                await client.get(`/users/${userId}`)
                                    .then(({ data }: any) => {
                                        const fields = ['username', 'email'];
                                        fields.forEach(field => setFieldValue(field, data[field], false));
                                    });
                            }
                        }, [setFieldValue])

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            // onSubmit(submitForm())
                            loadUser()
                        }, [loadUser, submitForm]);
                        
                        return (
                            <div className="flex flex-col justify-center w-[24em] lg:w-[30em]">
                                <div className="relative h-full mx-0">
                                    <div className="relative pt-3 pb-6 px-4 bg-white shadow-sm rounded-xl border border-gray-400">
                            
                                    <Form>
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

                                        <div className='py-4'>
                                            <Select
                                                initialData={
                                                    {
                                                        label: 'Entre com as iniciais...',
                                                        value: ''
                                                    }
                                                }
                                                selectedValue={selectedRole}
                                                defaultOptions={getRolesDefaultOptions()}
                                                options={loadOptions}
                                                label="Grupo de Usuário"
                                                callback={selectRole}
                                            />
                                        </div>
                                    </Form>
                                    
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Formik>
                
            </div>
    )
})