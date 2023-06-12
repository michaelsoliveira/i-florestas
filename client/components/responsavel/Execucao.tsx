import { createRef, forwardRef, useCallback, useContext, useEffect, useState } from "react";
import { useForm, useFormState } from 'react-hook-form'
import { useRouter } from "next/router"
import alertService from "../../services/alert";
import { useSession } from "next-auth/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "../Link";
import RadioGroup from "../Form/RadioGroup";
import Option from "../Form/Option";
import PessoaFisica from "../../components/Form/PessoaFisica";
import Endereco from "../endereco";
import { ProjetoContext } from "contexts/ProjetoContext";
import PessoaJuridica from "../Form/PessoaJuridica";
import { FormInput } from "../FormInput";

const Execucao =  forwardRef<any, any>(
    function AddEdit(
      { responseData }, 
      ref
    ) {
    const router = useRouter()
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const [ tipoPessoa, setTipoPessoa ] = useState(0)
    const [ responsavel, setResponsavel ] = useState<any>()
    const { projeto } = useContext(ProjetoContext)
    const [estado, setEstado] = useState<any>()
    const isAddMode = !projeto?.pessoa

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()

    function onSelect(index: number) {
        setTipoPessoa(index)
    }

    const loadResponsavel = useCallback(async () => {

            const { data } = await client.get(`/responsavel/find-all/${projeto?.id}`)
            setResponsavel(data)
            if (data?.tipo === 'J') { 
                setTipoPessoa(1) 
            } else {
                setTipoPessoa(0)
            }

            setEstado({
                label: data?.endereco?.estado?.nome,
                value: data?.endereco?.estado?.id
            })

            for (const [key, value] of Object.entries(data)) {
                if (key === 'tipo' && value === 'F')
                {
                    setValue("pessoaFisica".concat(key), value, {
                        shouldValidate: true,
                        shouldDirty: true
                    })                     
                } else if (key === 'tipo' && value === 'J') {
                    setValue("pessoaJuridica".concat(key), value, {
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
        
    }, [projeto, client, setValue])
    
    useEffect(() => {  
        loadResponsavel()
    }, [loadResponsavel])

    async function onSubmit(data: any) {
        responseData(data)
        try {
            return isAddMode
                ? createResponsavel({...data, id_projeto: projeto?.id, tipoPessoa: tipoPessoa === 0 ? 'F' : 'J', resp: 'exec'})
                : updateResponsavel(responsavel?.id, { ...data, id_projeto: projeto?.id, tipoPessoa: tipoPessoa === 0 ? 'F' : 'J', resp: 'exec' })
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function createResponsavel(data: any) {
        await client.post('/responsavel', data)
            .then((response: any) => {
                const { error, responsavel, message } = response.data
                if (error) {
                    alertService.error(message)
                } else {
                    alertService.success(`Responsável Técnico cadastrada com SUCESSO!!!`);
                    router.push(`/poa`)
                }
            }) 
    }

    async function updateResponsavel(id: string, data: any) {
        
        await client.put(`/responsavel/${id}`, data)
            .then((response: any) => {
                const responsavel = response.data
                alertService.success(`Responsável Técnico atualizada com SUCESSO!!!`);
                router.push('/poa')
            })
    }
    
    return (
        <div className="px-4 py-4">
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                    <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="shadow sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6 w-full">
                            <div className="grid grid-cols-6 gap-6 w-full">   
                                <div className="col-span-6 lg:col-span-3">
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
                                <div className="grid grid-cols-6 gap-4">
                                    <div className="col-span-2">     
                                        <FormInput
                                            name="crea"
                                            label="CREA"
                                            register={register}
                                            errors={errors}
                                            rules={ {required: 'O campo nome é obrigatório'} }
                                            id="nome"
                                            className="pb-4"
                                        />
                                    </div> 
                                    <div className="col-span-2">     
                                        <FormInput
                                            name="numero_art"
                                            label="Número ART"
                                            register={register}
                                            errors={errors}
                                            id="rg"
                                            className="pb-4"
                                        />
                                    </div> 
                                </div>
                                    
                                { tipoPessoa === 0 ? (
                                    <PessoaFisica register={register} errors={errors} />
                                ) : (
                                    <PessoaJuridica register={register} errors={errors} />
                                )}
                                    <Endereco value={estado} setValue={setValue} register={register} errors={errors} />
                                </div>
                            </div>
                        </div>
                        </div>
                    </form>
                    
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Execucao