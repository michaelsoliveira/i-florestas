import { createRef, forwardRef, useCallback, useContext, useEffect, useState } from "react";
import { useForm, useFormState } from 'react-hook-form'
import { useRouter } from "next/router"
import alertService from "../../services/alert";
import { useSession } from "next-auth/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "../Link";
import PessoaFisica from "../../components/Form/PessoaFisica";
import Endereco from "../endereco";
import { ProjetoContext } from "contexts/ProjetoContext";
import { FormInput } from "../FormInput";
import { useModalContext } from 'contexts/ModalContext'

const Elaboracao =  forwardRef<any, any>(
    function AddEdit(
      { responseData }, 
      ref
    ) {
    const router = useRouter()
    const { client } = useContext(AuthContext)
    const [ responsavel, setResponsavel ] = useState<any>()
    const { projeto } = useContext(ProjetoContext)
    const [estado, setEstado] = useState<any>()
    const isAddMode = !projeto?.pessoa
    const { hideModal } = useModalContext()

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()

    const loadResponsaveis = useCallback(async () => {

            const { data } = await client.get(`/responsavel?tipo=elab`)
            setResponsavel(data)

            setEstado({
                label: data?.endereco?.estado?.nome,
                value: data?.endereco?.estado?.id
            })

            for (const [key, value] of Object.entries(data)) {
                setValue(key, value, {
                    shouldValidate: true,
                    shouldDirty: true
                }) 
            }
        
    }, [projeto, client, setValue])
    
    useEffect(() => {  
        loadResponsaveis()
    }, [loadResponsaveis])

    async function onSubmit(data: any) {
        responseData(data)
        try {
            return isAddMode
                ? create({...data, id_projeto: projeto?.id, tipo: 'elab'})
                : update(responsavel?.id, { ...data, id_projeto: projeto?.id, tipo: 'elab' })
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function create(data: any) {
        await client.post('/responsavel', data)
            .then((response: any) => {
                const { error, responsavel, message } = response.data
                if (error) {
                    console.log('Error: ', message)
                    alertService.error(message)
                } else {
                    responseData(responsavel)
                    hideModal()
                    alertService.success(`Responsável Técnico cadastrada com SUCESSO!!!`);
                    //router.push(`/poa`)
                }
            }) 
    }

    async function update(id: string, data: any) {
        
        await client.put(`/responsavel/${id}`, {...data, tipo: 'elab'})
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
                                <div className="col-span-6">
                                    <div className="grid grid-cols-6 gap-4">
                                        <div className="col-span-2">     
                                            <FormInput
                                                name="crea"
                                                label="CREA"
                                                register={register}
                                                errors={errors}
                                                rules={ {required: 'O campo CREA é obrigatório'} }
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
                                        <PessoaFisica register={register} errors={errors} />
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

export default Elaboracao