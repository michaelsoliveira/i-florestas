/* eslint-disable react-hooks/rules-of-hooks */
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { create } from '../store/userSlice'
import * as Yup from 'yup'
import { setMessage } from "../store/messageSlice"
import 'react-toastify/dist/ReactToastify.css';
import AlertService from '../services/alert'
import { signIn } from 'next-auth/react';
import type { UserData } from "../services/user"

import { AuthContext } from '../contexts/AuthContext2';
import { useRouter } from 'next/router';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type RegisterType = {
    styles?: any;
    userId?: string;
    empresaId?: string;
    redirect?: boolean
}

export const RegisterForm = ({ styles, empresaId, userId, redirect }: RegisterType) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const user = useSelector((state: RootState) => state.user.data)
    const errorMessage = useSelector((state: RootState) => state.user.errorMessage)
    const isAddMode = !userId
    const { message } = useSelector((state: RootState) => state.message) as any

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

    async function handleRegister(data: UserData) {
        const preparedData = {
            ...data,
            empresaId
        }
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
                        console.log(response)
                        if (response.ok) {
                            AlertService.success('Login realizado com sucesso')
                            router.push('/')
                        } else {
                            AlertService.warn('Email ou senha inválidos, verifique os dados e tente novamente!')
                        }
                        
                    }).catch ((e) => {
                        console.log(e)
                    })
                } else {
                    console.log(responseData)
                    AlertService.success('Usuário cadastrado com SUCESSO!')
                    router.push(`/empresa/${empresaId}/users`)
                }
        })
        .catch((error: any) => {
            AlertService.warn(`Error: ${error.message}`)
        });
    }

    interface Values {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        provider: string;
        idProvider: string;
        isAddMode: boolean;
    }

    useEffect(() => {
        setMessage('Loading...')
        
        return () => {
            
        }
    }, [])
    
    return (
        <div>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    provider: '',
                    idProvider: '',
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
                {(props) => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                        setValues
                    } = props;
                    return (
                        <Form>
                            <label className={styles.label} htmlFor="username">Nome</label>
                            <Field className={styles.field} id="username" name="username" placeholder="Michael" />
                            <ErrorMessage className='text-sm text-red-500 mt-1' name="username" component="div" />

                            <label className={styles.label} htmlFor="email">Email</label>
                            <Field
                                className={styles.field}
                                id="email"
                                name="email"
                                placeholder="john@acme.com"
                                type="email"
                            />
                            <ErrorMessage className='text-sm text-red-500 mt-1' name="email" component="div" />
                            {isAddMode && (
                                <><label className={styles.label} htmlFor="password">Senha</label>
                                    <Field
                                        type="password"
                                        className={styles.field}
                                        id="password"
                                        name="password"
                                        placeholder="******"
                                    />
                                    <ErrorMessage className='text-sm text-red-500 mt-1' name="password" component="div" />
                                    <label className={styles.label} htmlFor="password">Confirmar a Senha</label>
                                    <Field
                                        type="password"
                                        className={styles.field}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="******"
                                    />
                                    <ErrorMessage className='text-sm text-red-500 mt-1' name="confirmPassword" component="div" />
                                </>
                            )}
                            <div className='mt-8 flex flex-row justify-end w-full items-center'>
                                <button className={classNames(styles.button, 'w-full')} type="submit">Cadastrar</button>
                            </div>
                    
                        </Form>
                    )
                }}
            </Formik>
            
        </div>
    );
}