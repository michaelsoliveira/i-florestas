import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { useCallback, useContext, useEffect, useState, forwardRef } from 'react'
import alertService from '../../services/alert'
import { AuthContext } from 'contexts/AuthContext'
import { useModalContext } from 'contexts/ModalContext'
import { OptionType, Select } from '../Select'
import { useSession } from 'next-auth/react'
import { ProjetoContext } from 'contexts/ProjetoContext'
import { setUmf } from 'store/umfSlice';
import { setUpa } from 'store/upaSlice';
import { useAppDispatch } from 'store/hooks';
import * as Yup from 'yup'

type ChangeActiveType = {
    callback?: any;
}

export const ChangeActive = forwardRef<any, ChangeActiveType>(
    function ChangeActive({ callback }, ref) {
        const { client } = useContext(AuthContext)
        const { hideModal } = useModalContext()
        const { data: session } = useSession()
        const [selectedProjeto, setSelectedProjeto] = useState<any>()
        const [projetos, setProjetos] = useState<any>()
        const { projeto, setProjeto } = useContext(ProjetoContext)
        const dispath = useAppDispatch()

        const loadProjetos = useCallback(async () => {
            if (typeof session !== typeof undefined){
                
                const response = await client.get(`/projeto`)
                const { projetos, error, message } = response.data
                
                const projetoAtivo = projetos ? projetos.find((projeto: any) => projeto.active === true) : {}
                
                setSelectedProjeto({
                    label: projetoAtivo?.nome,
                    value: projetoAtivo?.id
                })

                setProjetos(projetos)
                setProjeto(projetoAtivo)
                if (error) {
                    console.log(message)
                }
                
            }
        }, [session, client, setProjeto])

        useEffect(() => {
            let isLoaded = false
            if (!isLoaded) {
                loadProjetos()
                    .then(() => {
                        isLoaded = true
                    })
            }

            return () => {
                isLoaded = false
            }
        }, [loadProjetos])

        const loadOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
            const response = await client.get(`/projeto/search/q?nome=${inputValue}`)
            const json = response.data
            
            callback(json?.map((projeto: any) => ({
                value: projeto.id,
                label: projeto.nome
            })))
        };

        function getProjetosDefaultOptions() {
            return projetos?.map((projeto: any) => {
                return {
                    label: projeto.nome,
                    value: projeto.id
                }
            })
        }

        async function handleSubmit(dataRequest: any) {
            const { data: projetoResponse } = await client.post(`/projeto/active/${dataRequest?.projeto.value}`)
            const response = await client.get(`/projeto/${dataRequest?.projeto.value}/default-data`)
            const { data } = response.data
            dispath(setUmf({
                id: data?.id,
                nome: data?.nome
            }))
            console.log(data?.upa)
            data?.upa &&
            dispath(setUpa({
                id: data?.upa[0].id,
                descricao: data?.upa[0].descricao,
                tipo: data?.upa[0].tipo
            }))

            setProjeto(projetoResponse?.projeto)
            hideModal()
        }

        const validationSchema = Yup.object().shape({
            projeto: Yup.array().nullable()
        })

        interface Values {
            projeto: any
        }
        return (
            <div>
                <Formik
                    innerRef={ref}
                    initialValues={{
                        projeto: {}
                    }}
                    validationSchema={validationSchema}
                    onSubmit={ (
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        handleSubmit(values)
                    }}
                >
                    {({ errors, touched, isSubmitting, setFieldValue, setFieldTouched, setTouched }) => {

                        return (
                            <div className="relative py-3 w-full max-w-xl mx-auto h-full">
                                <div className='pb-4'>
                                    <Field name="projeto">
                                        {() => (
                                            <Select
                                                placeholder='Entre com as iniciais...'
                                                selectedValue={selectedProjeto}
                                                defaultOptions={getProjetosDefaultOptions()}
                                                options={loadOptions}
                                                callback={(data) =>{ 
                                                    setSelectedProjeto(data) 
                                                    setFieldValue('projeto', data)
                                                }}
                                            />
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <span className='font-semibold'>Projeto Ativo: { projeto?.nome }</span>
                                </div>
                            </div>
                            )
                }}
            </Formik>
            </div>
        )
})


export default ChangeActive