'use client'

import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import React, { useCallback, useContext, useEffect, forwardRef , useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { create } from '@/redux/features/userSlice'
import { object, string, boolean, ref as refYup } from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import alertService from '@/services/alert'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { Select, OptionType } from '@/components/ui/Select';
import RadioGroup from '../form/RadioGroup';
import Option from '../form/Option';
import FocusError from '../form/FocusError';
import { useModalContext } from '@/context/ModalContext';
import { ProjetoContext } from '@/context/ProjetoContext';

type AddEditType = {
    styles?: any;
    userId?: string;
    redirect?: boolean
    sendForm?: any;
    roles?: any[]
}

export const AddEdit = forwardRef<any, AddEditType>(
    function AddEdit(
      { styles, userId, sendForm, redirect, roles}, 
      ref
    ) {
        const dispatch = useAppDispatch()
        const router = useRouter()
        const isAddMode = !userId
        const { client } = useContext(AuthContext)
        const [selectedUser, setSelectedUser] = useState<any>()
        const [selectedRoles, setSelectedRoles] = useState<any>([])
        const [option, setOption] = useState<number | undefined>(0)
        const { data: session } = useSession()
        const [ users, setUsers ] = useState<any>()
        const { projeto } = useContext(ProjetoContext)

        const { hideModal } = useModalContext()

        function onSelect(index: number) {
            setOption(index)
        }

        const loadUsers = useCallback(async() => {
            if (session) {
                const { data } = await client.get('/users/search')
                setUsers(data)
            }
        }, [session, client])

        useEffect(() => {
            let isLoaded = false
            
            if (!isLoaded) loadUsers()
            return () => {
                isLoaded = true
            }
        }, [loadUsers])

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

        const validationSchema = object({
            isAddMode: boolean(),
            projeto: string()
                .when('id_projeto', {
                    is: (id_projeto: string) => {
                        if (id_projeto === '') return false
                    },
                    then: (schema: any) => 
                        schema.string()
                        .required('Campo nome do projeto é obrigatório')
                        .min(6, 'O campo deve ter no mínimo 6 caracteres')

                    }),
                username: string().when('option', {
                    is: (option: number) => option === 0,
                    then: (schema: any) => string().test(
                        "len",
                        "O nome de usuário tem que ter entre 3 e 40 caracteres.",
                        (val: any) =>
                        val &&
                        val.toString().length >= 3 &&
                        val.toString().length <= 40
                    )
                    .required("Campo obrigatório!")
                }),
                email: string()
                    .when('option', {
                        is: (option:any) => option===0,
                        then: () => string()
                            .email("Este não é um email válido.")
                            .required("Campo obrigatório!")
                    }),
                password:
                    string()
                    .when('option', {
                        is: (option:any) => option===0,
                        then: () => string()
                        .when('isAddMode', {
                            is: true,
                            then: () => string()
                                .required('Senha é obrigatória')
                                .min(6, 'A senha deve possuir no mínimo 6 caracteres')
                        })
                    }),
                confirmPassword: string()
                    .when('option', {
                        is: (option:any) => option===0,
                        then: () => string()
                        .when('password', (password: any, schema: any) => {
                            if (password || isAddMode) return schema.required('A confirmação de senha é obrigatória')
                        })
                        .oneOf([refYup('password')], 'As senhas informadas não coincidem')
                    }),
                id_user: string()
                    .when('option', {
                        is: (option:any) => option===1,
                        then: () => string()
                        .when('isAddMode', {
                            is: true,
                            then: () => string().required('É necessário selecionar um usuário')
                        }) 
                    })
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
                                    hideModal()
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
                            hideModal()
                        }
                })
                .catch((error: any) => {
                    console.log(error.message)
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
                            hideModal()
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
            projeto: string;
            roles: any;
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
                        projeto: '',
                        id_provider: '',
                        isAddMode,
                        id_user: '',
                        id_projeto: '',
                        roles: {},
                        option: 0
                    }}
                    validationSchema={validationSchema}
                    onSubmit={ (
                        values: Values,
                        { setSubmitting, setFieldValue }: FormikHelpers<Values>
                    ) => {
                        handleRegister(values)
                    }}
                >
                    {({ errors, touched, isSubmitting, setFieldValue, setFieldTouched, setTouched }) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const loadUser = useCallback(async () => {
                            if (!isAddMode) {
                                await client.get(`/users/${projeto?.id}/${userId}`)
                                    .then(({ data }: any) => {
                                        if (data?.users_roles?.length > 0) {
                                            const roles = data?.users_roles.map((role: any) => {
                                                return {
                                                    label: role.name,
                                                    value: role.id
                                                }
                                            })
                                            setSelectedRoles(roles)    
                                            setFieldValue('roles', roles)
                                        }
                                        
                                        const fields = ['username', 'email'];
                                        setFieldValue('id_user', data?.id)
                                        setFieldValue('option', 1)
                                        fields.forEach(field => setFieldValue(field, data[field], false));
                                    });
                            }
                        }, [setFieldValue])

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            setFieldValue('id_projeto', projeto?.id)
                            loadUser()
                        }, [loadUser, setFieldValue]);
                        
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
                                 <div className={session ? 'lg:grid lg:grid-cols-2 lg:gap-4' : 'flex flex-col'}>
                                    {!projeto?.id && (
                                        <div>
                                            <label className={styles.label} htmlFor="projeto">Projeto</label>
                                            <Field
                                                className={styles.field}
                                                id="projeto"
                                                name="projeto"
                                                placeholder="Nome do Projeto"
                                            />
                                            <ErrorMessage className='text-sm text-red-500 mt-1' name="email" component="div" />
                                        </div>
                                    )}
                                    <div>
                                        <label className={styles.label} htmlFor="username">Nome</label>
                                        <Field type="text" className={styles.field} id="username" name="username" placeholder="Michael" />
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="username" component="div" />
                                    </div>
                                    <div>
                                        <label className={styles.label} htmlFor="emailRegister">Email</label>
                                        <Field
                                            className={styles.field}
                                            id="emailRegister"
                                            name="email"
                                            placeholder="john@acme.com"
                                            type="email"
                                        />
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="email" component="div" />
                                    </div>
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
                                                    placeholder='Entre com as iniciais...'
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
                        (<div className='w-full '>
                            <div className='py-4'>
                                <Field name="roles">
                                    {() => (
                                        <Select
                                            isMulti={true}
                                            selectedValue={selectedRoles}
                                            defaultOptions={getRolesDefaultOptions()}
                                            options={loadRolesOptions}
                                            label="Grupo de Usuário"
                                            // options={selectedRoles}
                                            callback={(data) => {
                                                setSelectedRoles(data)
                                                setFieldValue('roles', data)
                                            }}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage className='text-sm text-red-500 mt-1' name="roles" component="div" />
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