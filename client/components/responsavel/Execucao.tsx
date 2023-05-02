import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { useCallback, useContext, useEffect } from 'react'
import alertService from '../../services/alert'
import { AuthContext } from 'contexts/AuthContext'
import { useModalContext } from 'contexts/ModalContext'

type AddEditType = {
    reloadData: () => void;
    data?: any;
}

export const Execucao = ({reloadData, data}: AddEditType) => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()
    const isAddMode = !data
    const { client } = useContext(AuthContext)
    const { hideModal } = useModalContext()

    const loadData = useCallback(() => {
        if (data) {
            for (const [key, value] of Object.entries(data)) {
                setValue(key, value, {
                    shouldValidate: true,
                    shouldDirty: true
                })
            }
        } else {
            reset()
        }
    }, [data, reset, setValue])


    useEffect(() => {
        loadData()
    }, [loadData])

    async function onSubmit(data: any) {
        const preparedData = {
            ...data
        }

        try {
            return isAddMode
                ? createProjeto(preparedData)
                : updateProjeto(data?.id, preparedData)
        } catch (error: any) {
            alertService.error(error.message);
        }
    }

    async function createProjeto(data: any) {
        await client.post(`projeto`, data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    hideModal()
                    reloadData()
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
                    reloadData()
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <div className='mt-4 p-4 border-gray-200 border rounded-md'>
            <form onSubmit={handleSubmit(onSubmit)} id="hook-form">
                <div className='w-full'>
                    <FormInput
                        layout='floatLabel'
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
                        className="lg:w-full pb-4"
                    />
                </div>
                <FormInput
                        layout='floatLabel'
                        id="crea"
                        name="crea"
                        label="crea"
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
                        className="lg:w-24 pb-4"
                    />
                
            </form>
        </div>
    )
}

export default Execucao