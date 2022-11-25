import { useCallback, useContext, useEffect, useState } from "react";
import { useForm, useFormState } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from "next/router"
import alertService from "../../services/alert";
import { useSession } from "next-auth/react";
import { AuthContext } from "../../contexts/AuthContext";
import styles from 'styles/Empresa.module.scss'
import { Link } from "../Link";
import RadioGroup from "../Form/RadioGroup";
import Option from "../Form/Option";
import PessoaFisica from "./PessoaFisica";
import PessoaJuridica from "./PessoaJuridica";
import Endereco from "../endereco";
import { ProjetoContext } from "contexts/ProjetoContext";

const AddEdit = () => {
    const router = useRouter()
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const [ tipoPessoa, setTipoPessoa ] = useState(0)
    const [ detentor, setDetentor ] = useState<any>()
    const { projeto } = useContext(ProjetoContext)
    const isAddMode = !projeto.pessoa

    // const validationSchema = Yup.object().shape({
        
    //     "pessoaJuridica.razao_social":
    //     Yup.string().when('tipo', {
    //         is: (tipo:any) => tipo==='J',
    //         then: Yup.string()
    //             .min(3, "Razão Social deve ter no minimo 3 caracteres")
    //             .max(100, "Razão Social deve ter no máximo 100 caracteres")
    //             .required('O campo Razão Social é obrigatório '),
    //     }),
            
    //     nome:
    //         Yup.string()
    //             .nullable()
    //             .transform(value => (!value ? null : value))
    //             .min(3, "Nome deve ter no minimo 3 caracteres")
    //             .max(100, "Nome deve ter no máximo 100 caracteres"),
    //     resp_tecnico:
    //        Yup.string()
    //            .matches(
    //                /^[aA-zZ\s]+$/,
    //                "Somente letras são permitidas"
    //            )
    //            .nullable()
    //           .transform(value => (!value ? null : value))
    //            .min(3, "Responsável técnico deve ter no minimo 3 caracteres")
    //            .max(100, "Responsável técnico deve ter no máximo 100 caracteres")
    // })

    // const formOptions = { resolver: yupResolver(validationSchema) }
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()

    function onSelect(index: number) {
        setTipoPessoa(index)
    }

    const loadDetentor = useCallback(async () => {
            
        if (!isAddMode && typeof session !== typeof undefined) {

            const { data } = await client.get(`/detentor/${projeto?.id}`)
            setDetentor(data)
            if (data?.tipo === 'J') { 
                setValue('pessoaJuridica.nome', data?.nome)
                setValue('tipo', 'J')
                setTipoPessoa(1) 
            } else {
                setValue('pessoaFisica.nome', data?.nome)
                setValue('tipo', 'F')
                setTipoPessoa(0)
            }
            for (const [key, value] of Object.entries(data)) {
                if (key === 'tipo' && value === 1) {
                    setValue("pessoaJurica.".concat(key), value, {
                        shouldValidate: true,
                        shouldDirty: true
                    }) 
                } else {
                    setValue(key, value, {
                        shouldValidate: true,
                        shouldDirty: true
                    }) 
                }
                
            }
        }
    }, [isAddMode, session, client, projeto, setValue])
    
    useEffect(() => {  

        loadDetentor()

    }, [loadDetentor])

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createDetentor({...data, id_projeto: projeto?.id})
                : updateDetentor(detentor?.id, { ...data, id_projeto: projeto?.id})
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function createDetentor(data: any) {
        await client.post('/detentor', data)
            .then((response: any) => {
                const { error, message } = response.data

                if (error) {
                    alertService.error(message)
                } else {
                    const detentor = response.data
                    
                    alertService.success(`Detentor ${detentor?.nome} cadastrada com SUCESSO!!!`);
                    router.push(`/projeto`)
                }
            }) 
    }

    async function updateDetentor(id: string, data: any) {
        
        await client.put(`/detentor/${id}`, data)
            .then((response: any) => {

                const detentor = response.data
                alertService.success(`Detentor ${detentor?.nome} atualizada com SUCESSO!!!`);
                router.push('/projeto')
            })
    }
    
    return (
        <div className="px-4 py-4">
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="lg:p-6 p-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{ isAddMode ? 'Cadastro ' : 'Atualização ' } do Detentor</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Entre com as informações iniciais de seu projeto para ter acesso ao BOManejo.
                            </p>
                            
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6 w-full">
                            <div className="grid grid-cols-6 gap-6 w-full">   
                                <div className="col-span-6 w-96 text-center">
                                    <div>
                                    <RadioGroup labelText="Tipo">
                                        {["Física", "Jurídica"].map((el, index) => (
                                            <Option
                                                key={index}
                                                index={index}
                                                selectedIndex={tipoPessoa}
                                                onSelect={(index: any) => {
                                                    setValue('tipo', index === 0 ? 'F' : 'J')
                                                    onSelect(index)
                                                }}
                                            >
                                                {el}
                                            </Option> 
                                        ))}
                                    </RadioGroup>
                                    </div>
                                </div>   
                                <div className="col-span-6">
                                { tipoPessoa === 0 ? (
                                    <PessoaFisica register={register} errors={errors} />
                                ) : (
                                    <PessoaJuridica register={register} errors={errors} />
                                )}
                                <Endereco register={register} styles={styles} errors={errors} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <Link href={`/projeto`} className="text-center w-40 bg-gray-200 text-sm font-medium text-green-800 p-3 rounded-md">Voltar</Link>
                            <button type="submit" className="inline-flex w-40 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease duration-200">
                                Salvar
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEdit