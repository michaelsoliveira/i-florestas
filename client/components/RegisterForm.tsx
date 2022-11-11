/* eslint-disable react-hooks/rules-of-hooks */
import { Formik, Field, Form, FormikHelpers, ErrorMessage, FormikProps, FormikValues } from 'formik';
import { Ref, useCallback, useContext, useEffect, forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { create } from '../store/userSlice'
import * as Yup from 'yup'
import { setMessage } from "../store/messageSlice"
import 'react-toastify/dist/ReactToastify.css';
import alertService from '../services/alert'
import { signIn, useSession } from 'next-auth/react';
import type { UserData } from "../services/user"
import { useRouter } from 'next/router';
import { AuthContext } from 'contexts/AuthContext';
import { LinkBack } from './LinkBack';
import { useModalContext } from 'contexts/ModalContext';

type RegisterType = {
    styles?: any;
    userId?: string;
    redirect?: boolean
    projetoId?: string;
}

export const RegisterForm = forwardRef<any, RegisterType>(
    function RegisterForm(
      { styles, userId, redirect, projetoId, ...rest}, 
      ref
    ) {
        const dispatch = useAppDispatch()
        const router = useRouter()
        const isAddMode = !userId
        const { hideModal } = useModalContext()
        const { client } = useContext(AuthContext)

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
                            router.push(`/projeto/${projetoId}/users`)
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
                        console.log(user)
                        if (error) {
                            alertService.error(message)
                        } else {
                            alertService.success(message)
                            router.push(`/projeto/${projetoId}/users`)
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

                        const loadUser = useCallback(async () => {
                            if (!isAddMode) {
                                
                                await client.get(`/users/${userId}`)
                                    .then(({ data }: any) => {
                                        const fields = ['username', 'email'];
                                        fields.forEach(field => setFieldValue(field, data[field], false));
                                    });
                            }
                        }, [setFieldValue])

                        useEffect(() => {
                            // onSubmit(submitForm())
                            loadUser()
                        }, [loadUser, submitForm]);
                        
                        return (
                            <div className="flex flex-col justify-center sm:w-full">
                                <div className="relative h-full mx-0">
                                    <div className='flex flex-row items-center justify-between border border-gray-400 shadow-lg bg-gray-100 py-4 rounded-t-xl'>
                                        
                                        <div>
                                            <LinkBack href="#" className="flex flex-col relative left-0 px-2" />
                                        </div>
                                        <div className='px-2'>
                                            <h1 className='text-xl text-gray-800'>{isAddMode ? 'Novo ' : 'Editar '} Usuário</h1>
                                        </div>
                                    </div>
                                    <div className="relative p-4 bg-white shadow-sm rounded-b-xl border-x border-b border-gray-400">
                            
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