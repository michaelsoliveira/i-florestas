import { OptionType, Select } from '@/components/Select'
import { FormInput } from '@/components/FormInput'
import { createRef, FormEvent, useRef, useContext, useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '@/components/LinkBack'
import { Link } from '@/components/Link'
import { ProjetoContext } from 'contexts/ProjetoContext'
import { styles } from '../Utils/styles'
import { useModalContext } from 'contexts/ModalContext'
import {
    PlusIcon
} from '@heroicons/react/outline'
import { ErrorMessage } from '@hookform/error-message'
import Modal from '../Modal'

const Projetos = () => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm()
    const { client } = useContext(AuthContext)
    const { projeto, setProjeto } = useContext(ProjetoContext)
    const [ selectedProjeto, setSelectedProjeto ] = useState<any>()
    const [ projetoLocal, setProjetoLocal ] = useState<any>()
    const [ projetos, setProjetos ] = useState<any>()
    const { data: session } = useSession()
    const isAddMode = !selectedProjeto

    const { showModal, hideModal, store } = useModalContext()
    const { visible, type } = store

    let addEditForm = (
            <form onSubmit={handleSubmit(onSubmit)} id="hook-form">
                <div className='w-full'>
                    <FormInput
                        id="nome"
                        name="nome"
                        label="Nome"
                        register={register}
                        errors={errors}
                        rules={
                            {
                                required: 'O campo nome é obrigatório',
                                minLength: {
                                    value: 3,
                                    message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                }
                            }}
                        className="lg:w-96 pb-4"
                    />
                </div>
                <FormInput
                    id="active"
                    name="active"
                    label="Ativo?"
                    type="checkbox"
                    // layout="floatLabel"
                    register={register}
                    errors={errors}
                    className="py-4 w-10"
                />
                {/* <button className="w-2/5 bg-green-600 text-white p-3 rounded-md">Salvar</button> */}
            </form>
    )


    const deleteSingleModal = () => 
    showModal({ 
            type: 'delete.projeto',
            title: 'Deletar Projeto', onConfirm: () => {
            deleteProjeto(selectedProjeto?.id) }, 
            styleButton: styles.redButton, 
            iconType: 'warn', 
            confirmBtn: 'Deletar', 
            content: `Tem Certeza que deseja excluir a UMF ${selectedProjeto?.nome} ?` 
        })

    const editModal = () => showModal({ title: 'Editar Projeto', type: "submit", hookForm: 'hook-form', styleButton: styles.greenButton, confirmBtn: 'Salvar' })
    const addModal = () => {
        setSelectedProjeto(null)
        reset()
        showModal({ title: 'Novo Projeto', type: "submit", hookForm: 'hook-form', styleButton: styles.greenButton, confirmBtn: 'Salvar' })
    }
        

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
    const loadProjetos = async () => {
        if (typeof session !== typeof undefined){
            const response = await client.get(`projeto`)
            const { projetos } = response.data

            if (projetoLocal) {
                const localProjeto = projetos.find((projeto: any) => projeto.id === projetoLocal.value)
                if (localProjeto) {
                    setProjetoLocal({
                        label: localProjeto.nome,
                        value: localProjeto.id
                    })
                } else {
                    setProjetoLocal({
                        label: projeto.nome,
                        value: projeto.id
                    })
                }
            }
            
            setProjetos(projetos)
            const projetoAtivo = projetos ? projetos.find((projeto: any) => projeto.active === true) : {}
            setProjeto(projetoAtivo)
        }
    }

    useEffect(() => {
      
        loadProjetos()    
      
    }, [session, client])

    async function deleteProjeto(id?: string){
        if (selectedProjeto?.active) {
            alertService.warn('Este projeto está ativo, por favor ative outro projeto para poder excluir este!')
            hideModal()
        } else {
            await client.delete(`/projeto/single/${id}`)
            .then((response: any) => {
                const { error, message } = response.data

                if (error) {
                    alertService.error(message)
                } else {
                    alertService.success(message)
                }
                
                hideModal()
                loadProjetos()
                setProjetoLocal({
                    value: projeto.id,
                    label: projeto.nome
                })
            })
        }
    }

    async function onSubmit(data: any) {
        const preparedData = {
            ...data
        }

        try {
            return isAddMode
                ? createProjeto(preparedData)
                : updateProjeto(selectedProjeto?.id, preparedData)
        } catch (error: any) {
            alertService.error(error.message);
        }
    }

    async function createProjeto(data: any) {
        await client.post('projeto', data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    hideModal()
                    loadProjetos()
                } else {
                    alertService.error(message)
                }
            }) 
    }

    async function updateProjeto(id: string, data: any) {

        await client.put(`/projeto/${id}`, data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    hideModal()
                    loadProjetos()
                } else {
                    alertService.error(message)
                }
            })
    }

    const selectProjeto = (data: any) => {
        const selectedProjeto = projetos.find((projeto: any) => projeto.id === data.value)
        setSelectedProjeto(selectedProjeto)
        setProjetoLocal(data)

        for (const [key, value] of Object.entries(selectedProjeto)) {
                setValue(key, value, {
                    shouldValidate: true,
                    shouldDirty: true
                })
            }
    }

    return (
        <div>
            {visible && (type === 'submit') ? (<Modal>{addEditForm}</Modal>) : (<Modal />)}
            <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50">
                
                <div className="relative py-3 w-full max-w-xl mx-auto">
                    <div className='flex flex-row items-center justify-between shadow-lg bg-gray-100 py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl text-gray-800'>Cadastrar Projeto</h1>
                            ): (
                                <h1 className='text-xl text-gray-800'>Editar Projeto</h1>
                            )}
                        </div>
                        <div className='flex items-center justify-center h-8 w-8 mr-4 bg-green-400 rounded-full'>
                        <Link href="#" className="" onClick={addModal}>
                            <PlusIcon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                        </div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl">
                        

                            <div className='pb-4'>
                                <Select
                                    initialData={
                                        {
                                            label: 'Entre com as iniciais...',
                                            value: ''
                                        }
                                    }
                                    selectedValue={projetoLocal}
                                    defaultOptions={getProjetosDefaultOptions()}
                                    options={loadOptions}
                                    label="Localizar Projeto"
                                    callback={selectProjeto}
                                />
                            </div>

                            <div>
                                <span className='font-semibold'>Projeto Ativo: { projeto?.nome }</span>
                            </div>

                            {
                                projetoLocal && (
                                    <div className='flex items-center justify-between pt-4'>
                                        <Link href="#" className="text-center w-2/5 bg-sky-500 text-white p-3 rounded-md" onClick={editModal}>Editar</Link>
                                
                                        <Link href="#" className="text-center w-2/5 bg-red-600 text-white p-3 rounded-md" onClick={deleteSingleModal}>Deletar</Link>
                                    </div>
                                )
                            }
                    </div>
                </div>              
            </div>
        </div>
    )
}

export default Projetos