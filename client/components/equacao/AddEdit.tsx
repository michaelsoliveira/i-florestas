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
    equacaoId?: string;
    redirect?: boolean
    projetoId?: string;
    sendForm?: any;
    eqModelos?: any[];
}

export const AddEdit = forwardRef<any, AddEditType>(
    function AddEdit(
      { styles, equacaoId, sendForm, projetoId, eqModelos }, 
      ref
    ) {
        const dispatch = useAppDispatch()
        const router = useRouter()
        const isAddMode = !equacaoId
        const { client } = useContext(AuthContext)
        const [selectedEqModelo, setSelectedEqModelo] = useState<any>()
        const { data: session } = useSession()

        const loadEqModelosOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
            const response = await client.get(`/eq-modelo/search?nome=${inputValue}`)
            const json = response.data
            
            callback(json?.map((eqModelo: any) => ({
                value: eqModelo.id,
                label: eqModelo.nome
            })))
        }

        function getEqModelosDefaultOptions() {
            return eqModelos?.map((eqModelo: any) => {
                return {
                    label: eqModelo.nome,
                    value: eqModelo.id
                }
            })
        }

        const validationSchema = Yup.object().shape({
            isAddMode: Yup.boolean(),
            nome: Yup.string()
                    .test(
                    "len",
                    "O nome tem que ter entre 3 e 20 caracteres.",
                    (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
                )
                .required("Campo obrigatório!"),
            expressao: Yup.string()
                    .test(
                        "len",
                        "A expressão tem que ter entre 3 e 40 caracteres.",
                        (val: any) =>
                        val &&
                        val.toString().length >= 3 &&
                        val.toString().length <= 20
                    )
                    .required("Campo obrigatório!")
            });

        async function handleRegister(data: any) {
            if (isAddMode) {
                await client.post(`/eq-volume`, data)
                    .then((response: any) => {
                        const { error, message } = response.data
                        
                        if (error) {
                            alertService.error(message)
                        } else {
                            alertService.success(message)
                            sendForm()
                            // hideModal()
                        }
                    })
            } else {
                await client.put(`/eq-volume/${equacaoId}`, data)
                    .then((response: any) => {
                        const { error, message } = response.data
                        
                        if (error) {
                            alertService.error(message)
                        } else {
                            alertService.success(message)
                            sendForm()
                        }
                    })
            }    
        }

        interface Values {
            nome: string;
            expressao: string;
            observacao: string;
            isAddMode: boolean;
            id_projeto: string;
            id_eqModelo: string;
        }
        
        return (
            <div>
                <Formik
                    innerRef={ref}
                    initialValues={{
                        nome: '',
                        expressao: '',
                        observacao: '',
                        isAddMode,
                        id_eqModelo: '',
                        id_projeto: '',
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
                        const loadEquacao = useCallback(async () => {
                            if (!isAddMode) {
                                
                                await client.get(`/eq-modelo/${projetoId}/${equacaoId}`)
                                    .then(({ data }: any) => {
                                        setSelectedEqModelo({
                                            label: data?.nome,
                                            value: data?.id
                                        })
                                        const fields = ['nome', 'expressao', 'observacao'];
                                        setFieldValue('id_eqModulo', data?.id)
                                        
                                        fields.forEach(field => setFieldValue(field, data[field], false));
                                    });
                            }
                        }, [setFieldValue])

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            setFieldValue('id_projeto', projetoId)
                            loadEquacao()
                        }, [loadEquacao, setFieldValue, values]);
                        
                        return (
                            <div className="flex flex-col justify-center w-full">
                                <div className="relative h-full mx-0">
                                    <div className="relative pt-3 px-4 w-full">
                                        <Form>
                                       
                                 <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
                                    <div>
                                        <label className={styles.label} htmlFor="nome">Nome</label>
                                        <Field className={styles.field} id="nome" name="nome" placeholder="Michael" />
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="nome" component="div" />
                                    </div>
                                    <div>
                                        <label className={styles.label} htmlFor="expressao">Expressão</label>
                                        <Field
                                            className={styles.field}
                                            id="expressao"
                                            name="expressao"
                                        />
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="expressao" component="div" />
                                    </div>
                                    <div>
                                        <label className={styles.label} htmlFor="observacao">Observação</label>
                                        <Field
                                            className={styles.field}
                                            id="observacao"
                                            name="observacao"
                                        />
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="observacao" component="div" />
                                    </div>
                             
                                    <div className='py-4'>
                                        <Field name="id_eqModelo">
                                            {() => (
                                                <Select
                                                    initialData={
                                                        {
                                                            label: 'Entre com as iniciais...',
                                                            value: ''
                                                        }
                                                    }
                                                    selectedValue={selectedEqModelo}
                                                    defaultOptions={getEqModelosDefaultOptions()}
                                                    options={loadEqModelosOptions}
                                                    label="Pesquisar Equação Modelo"
                                                    callback={(value) => { 
                                                        setFieldValue('id_eqModelo', value?.value)
                                                        setSelectedEqModelo(value) 
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage className='text-sm text-red-500 mt-1' name="id_eqModelo" component="div" />
                                    </div>
                            
                            </div>
                            
                        </Form>
                        </div>
                        </div>
                        </div>)}}
        </Formik>
            
        </div>
    )
})