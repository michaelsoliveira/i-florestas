import { createRef, forwardRef, useCallback, useContext, useEffect, useState } from "react";
import { useForm, useFormState } from 'react-hook-form'
import { useRouter } from "next/router"
import alertService from "../../services/alert";
import { useSession } from "next-auth/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "../Link";
import RadioGroup from "../Form/RadioGroup";
import Option from "../Form/Option";
import PessoaFisica from "../Form/PessoaFisica";
import Endereco from "../endereco";
import { ProjetoContext } from "contexts/ProjetoContext";

const Elaboracao =  forwardRef<any, any>(
    function AddEdit(
      { responseData }, 
      ref
    ) {
    const router = useRouter()
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const [ tipoPessoa, setTipoPessoa ] = useState(0)
    const [ detentor, setDetentor ] = useState<any>()
    const { projeto } = useContext(ProjetoContext)
    const [estado, setEstado] = useState<any>()
    const isAddMode = !projeto?.pessoa

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()

    function onSelect(index: number) {
        setTipoPessoa(index)
    }

    const loadResponsavel = useCallback(async () => {

            const { data } = await client.get(`/detentor/${projeto?.id}`)
            setDetentor(data)
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
                ? createDetentor({...data, id_projeto: projeto?.id, tipo: tipoPessoa === 0 ? 'F' : 'J'})
                : updateDetentor(detentor?.id, { ...data, id_projeto: projeto?.id })
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function createDetentor(data: any) {
        await client.post('/detentor', data)
            .then((response: any) => {
                const { error, detentor, message } = response.data
                if (error) {
                    alertService.error(message)
                } else {
                    alertService.success(`Responsável Técnico cadastrada com SUCESSO!!!`);
                    router.push(`/poa`)
                }
            }) 
    }

    async function updateDetentor(id: string, data: any) {
        
        await client.put(`/detentor/${id}`, data)
            .then((response: any) => {
                const detentor = response.data
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