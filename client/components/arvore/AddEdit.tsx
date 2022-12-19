import { OptionType, Select } from '../Select'
import { FormInput } from '../FormInput'
import { createRef, FormEvent, useRef, useContext, useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '../LinkBack'
import { Link } from '../Link'
import { ProjetoContext } from 'contexts/ProjetoContext'
import RadioGroup from '../Form/RadioGroup'
import Option from "../Form/Option";
import { useAppSelector } from 'store/hooks'
import { RootState } from 'store'

const AddEdit = ({ id }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [observacao, setObservacao] = useState<OptionType>()
    const [observacoes, setObservacoes] = useState<any>()
    const [orient_x, setOrientX] = useState<any>()
    const [medicao, setMedicao] = useState<any>()
    const { projeto } = useContext(ProjetoContext)
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const upa = useAppSelector((state: RootState) => state.upa)
    const ut = useAppSelector((state: RootState) => state.ut)
    const router = useRouter()
    const isAddMode = !id

    const loadObsOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/obs-arvore/search/q?nome=${inputValue}`)
        const json = response.data
        
        callback(json?.map((observacao: any) => ({
            value: observacao.id,
            label: observacao.nome
        })))
    };

    useEffect(() => {        
        async function loadArvore() {
        
            if (!isAddMode && typeof session !== typeof undefined) {
                
                const { data: arvore } = await client.get(`/arvore/${id}`)
                
                setObservacao({
                    label: arvore?.observacao_arvore?.nome,
                    value: arvore?.observacao_arvore?.id
                })
                for (const [key, value] of Object.entries(arvore)) {
                    setValue(key, value, {
                        shouldValidate: true,
                        shouldDirty: true
                    })
                }
            }
        }
        
        loadArvore()

    }, [session, isAddMode, client, id, setValue, setObservacao])

    useEffect(() => {
        const defaultOptions = async () => {
            if (typeof session !== typeof undefined){
                const response = await client.get(`categoria`)
                const { observacoes } = response.data

                setObservacoes(observacoes)
            }
        }
        defaultOptions()    
        
    }, [session, client])

    const selectedObservacao = (data: any) => {
        setObservacao(data)
        setValue('observacao_arvore', data?.value)
    }

    async function onSubmit(data: any) {
        const preparedData = {
            ...data,
            id_projeto: projeto?.id,
            id_observacao: observacao?.value ?? observacao?.value
        }
        
        try {
            return isAddMode
                ? createArvore(preparedData)
                : updateArvore(id, preparedData)
        } catch (error: any) {
            console.log(error.message)
            alertService.error(error.message);
        }
        
    }

    async function createArvore(data: any) {
        client.post('arvore', data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/arvore')
                } else {
                    alertService.error(message)
                }
            }) 
    }

    function getObservacoesDefaultOptions() {
        return observacoes?.map((observacao: any) => {
            return {
                label: observacao.nome,
                value: observacao.id
            }
        })
    }

    async function updateArvore(id: string, data: any) {
        
        client.put(`/arvore/${id}`, data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/arvore')
                } else {
                    console.log(message)
                    alertService.error(message)
                }
            })
    }

    function onSelect(index: number) {
        setMedicao(index)
    }

    return (
        <div>
            <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50">
                
                <div className="relative py-3 w-full px-4 lg:max-w-4xl mx-auto">
                    <div className='flex flex-row items-center justify-between shadow-lg bg-gray-100 py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/arvore" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl text-gray-800'>Cadastro de Árvore</h1>
                            ): (
                                <h1 className='text-xl text-gray-800'>Editar Árvore</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid grid-cols-3 lg:grid-cols-5 gap-4'>
                                <div className='col-span-3 lg:col-span-5 w-48'>
                                    <RadioGroup labelText="Medição">
                                        {["CAP", "DAP"].map((el, index) => (
                                            <Option
                                                key={index}
                                                index={index}
                                                selectedIndex={medicao ? medicao : 0}
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
                                <div>
                                    <FormInput
                                        id="numero_arvore"
                                        name="numero_arvore"
                                        label="Nº Árvore"
                                        register={register}
                                        errors={errors}
                                        rules={ {required: 'O campo nome é obrigatório'} }
                                        className="pb-4"
                                    />
                               
                                </div>
                                {
                                    (upa.tipo === 0) ? (
                                        <>
                                            <div>
                                                <FormInput
                                                    name="faixa"
                                                    label="Faixa"
                                                    register={register}
                                                    errors={errors}
                                                    rules={ {required: 'O campo nome é obrigatório'} }
                                                    id="faixa"
                                                    className="pb-4"
                                                />
                                            </div>
                                            <div>
                                                <FormInput
                                                    id="lat_x"
                                                    name="lat_x"
                                                    label="Coord. X"
                                                    register={register}
                                                    errors={errors}
                                                    rules={ {required: 'O campo nome é obrigatório'} }
                                                    className="pb-4"
                                                />
                                            </div>
                                            <div className='pt-1'>
                                                <Select
                                                    selectedValue={orient_x ? orient_x : { label: 'DIR', value: 'D' }}
                                                    defaultOptions={[
                                                        { label: 'DIR', value: 'D' },
                                                        { label: 'ESQ', value: 'E' }
                                                    ]}
                                                    label="DIR / ESQ"
                                                    callback={(e) => setOrientX(e)}
                                                />
                                            </div>
                                            <div>
                                                <FormInput
                                                    id="long_y"
                                                    name="long_y"
                                                    label="Coord. Y"
                                                    register={register}
                                                    errors={errors}
                                                    rules={ {required: 'O campo nome é obrigatório'} }
                                                    className="pb-4"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='lg:col-span-1 lg:w-full col-span-2 w-[7.5rem]'>
                                                <FormInput
                                                    name="ponto"
                                                    label="Ponto"
                                                    register={register}
                                                    errors={errors}
                                                    rules={ {required: 'O campo nome é obrigatório'} }
                                                    id="ponto"
                                                    className="pb-4"
                                                />
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    (medicao === 0) ? (
                                        <>
                                        <div>
                                            <FormInput
                                                name="cap"
                                                label="CAP"
                                                register={register}
                                                errors={errors}
                                                rules={ {required: 'O campo nome é obrigatório'} }
                                                id="cap"
                                                type='number'
                                                step={0.01}
                                                className="pb-4"
                                            />
                                        </div>
                                        </>
                                    ) : (
                                        <>
                                        <div>
                                            <FormInput
                                                name="dap"
                                                label="DAP"
                                                register={register}
                                                errors={errors}
                                                rules={ {required: 'O campo nome é obrigatório'} }
                                                id="dap"
                                                type='number'
                                                step={0.01}
                                                className="pb-4"
                                            />
                                        </div>
                                        </>
                                    )
                                }
                                <div>
                                    <FormInput
                                        name="altura"
                                        label="Altura"
                                        register={register}
                                        errors={errors}
                                        rules={ {required: 'O campo nome é obrigatório'} }
                                        id="altura"
                                        type='number'
                                        className="pb-4"
                                    />
                                </div>
                                <div>
                                    <FormInput
                                        name="fuste"
                                        label="Fuste"
                                        register={register}
                                        errors={errors}
                                        rules={ {required: 'O campo nome é obrigatório'} }
                                        id="fuste"
                                        type='number'
                                        className="pb-4"
                                    />
                                </div>
                                <div className='lg:col-span-2 col-span-3 pb-4'>
                                    <Select
                                        initialData={
                                            {
                                                label: 'Selecione uma Observação',
                                                value: ''
                                            }
                                        }
                                        selectedValue={observacao}
                                        defaultOptions={getObservacoesDefaultOptions()}
                                        options={loadObsOptions}
                                        label="Observação"
                                        callback={selectedObservacao}
                                    />
                                </div>
                                
                            </div>
                            <div>
                                    <div className='flex flex-row items-center justify-between pt-4 w-full'>
                                        <Link href="/arvore" className="text-center lg:w-1/6 bg-gray-200 text-gray-800 p-3 rounded-md">Voltar</Link>
                                        <button className="lg:w-1/6 bg-green-600 text-white p-3 rounded-md">Salvar</button>
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