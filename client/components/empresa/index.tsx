import { useContext, useEffect, useState } from "react";
import { useForm, useFormState } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from "next/router"
import EmpresaService, { EmpresaType } from "../../services/empresa"
import { useDispatch, useSelector } from "react-redux";
import AlertService from "../../services/alert";
import { useSession } from "next-auth/react";
import { AuthContext } from "../../contexts/AuthContext";
import { useAppSelector } from "../../store/hooks";

const Empresa = ({ id }: any) => {
    const router = useRouter()
    // const { id } = router.query as any
    const isAddMode = !id
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    
    useEffect(() => {        
        async function loadEmpresa() {
            
            if (!isAddMode && typeof session !== typeof undefined) {
                
                // const response = await EmpresaService.getById(id)
                // const { data } = response as any
                const { data } = await client.get(`/empresa/${id}`)
                
                for (const [key, value] of Object.entries(data)) {
                    setValue(key, value, {
                        shouldValidate: true,
                        shouldDirty: true
                    }) 
                }
            }
        }
        loadEmpresa()

    }, [session, isAddMode, client, id])

    const validationSchema = Yup.object().shape({
        razaoSocial:
            Yup.string()
                .min(3, "Razão Social deve ter no minimo 3 caracteres")
                .max(100, "Razão Social deve ter no máximo 100 caracteres")
                .required('O campo Razão Social é obrigatório '),
        nomeFantasia:
            Yup.string()
                .nullable()
                .transform(value => (!value ? null : value))
                .min(3, "Nome Fantasia deve ter no minimo 3 caracteres")
                .max(100, "Nome Fantasia deve ter no máximo 100 caracteres"),
        respTecnico:
            Yup.string()
                .matches(
                    /^[aA-zZ\s]+$/,
                    "Somente letras são permitidas"
                )
                .nullable()
                .transform(value => (!value ? null : value))
                .min(3, "Responsável técnico deve ter no minimo 3 caracteres")
                .max(100, "Responsável técnico deve ter no máximo 100 caracteres")
    })

    const formOptions = { resolver: yupResolver(validationSchema) }
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm(formOptions)

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createEmpresa(data)
                : updateEmpresa(id, data)
        } catch (error: any) {
            AlertService.error(error.message);
        }
        
    }

    async function createEmpresa(data: any) {
        await EmpresaService.create(data)
            .then((response: any) => {
                const empresa = response.data
                AlertService.success(`Empresa ${empresa?.razaoSocial} cadastrada com SUCESSO!!!`);
                router.push('/empresa')
            }) 
    }

    async function updateEmpresa(id: string, data: any) {
        
        await EmpresaService.update(id, data)
            .then((response: any) => {
                const empresa = response.data
                AlertService.success(`Empresa ${empresa?.razaoSocial} atualizada com SUCESSO!!!`);
                router.push('/empresa')
            })
    }
    
    return (
        <div className="px-4 py-4">
            <div className="mt-10 sm:mt-0 shadow-md">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="lg:p-6 p-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{ isAddMode ? 'Cadastro ' : 'Atualização ' } da Empresa</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Entre com as informações iniciais de sua empresa para ter acesso ao BOManejo.
                            </p>
                            
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">      
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="razaoSocial" className="field-label">*Razão Social</label>
                                    <input
                                        {...register('razaoSocial')}
                                        // value={state.razaoSocial}
                                        // onChange={handleChange}
                                        required
                                        name="razaoSocial"
                                        type="text" id="razacaoSocial" className="field-text" />
                                        <p className='text-sm text-red-500 mt-1'>{errors.razaoSocial?.message}</p>
                                </div>
                                            
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="nomeFantasia" className="field-label">Nome Fantasia</label>
                                    <input
                                        {...register('nomeFantasia')}
                                        // value={state.nomeFantasia}
                                        // onChange={handleChange}
                                        type="text" name="nomeFantasia" id="nomeFantasia" className="field-text" />
                                        <p className='text-sm text-red-500 mt-1'>{errors.nomeFantasia?.message}</p>
                                </div>
                                
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="nomeFantasia" className="field-label">CNPJ</label>
                                    <input
                                        {...register('cnpj')}
                                        // value={state.nomeFantasia}
                                        // onChange={handleChange}
                                        type="text" name="cnpj" id="cnpj" className="field-text w-64" />
                                        <p className='text-sm text-red-500 mt-1'>{errors.cnpj?.message}</p>
                                    </div>
                                    
                                    <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="respTecnico" className="field-label">Registro Ambiental</label>
                                    <input
                                        {...register('regAmbiental')}
                                        // value={state.respTecnico}
                                        // onChange={handleChange}
                                        type="text" name="regAmbiental" id="regAmbiental" className="field-text" />
                                        <p className='text-sm text-red-500 mt-1'>{errors.regAmbiental?.message}</p>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="respTecnico" className="field-label">Responsável Técnico</label>
                                    <input
                                        {...register('respTecnico')}
                                        // value={state.respTecnico}
                                        // onChange={handleChange}
                                        type="text" name="respTecnico" id="respTecnico" className="field-text" />
                                        <p className='text-sm text-red-500 mt-1'>{errors.respTecnico?.message}</p>
                                </div>
                                
                                <div className="col-span-6 sm:col-span-2">
                                    <label htmlFor="creaResp" className="field-label">CREA Responsável</label>
                                    <input
                                        {...register('creaResp')}
                                        // value={state.respTecnico}
                                        // onChange={handleChange}
                                        type="text" name="creaResp" id="creaResp" className="field-text" />
                                        <p className='text-sm text-red-500 mt-1'>{errors.creaResp?.message}</p>
                                </div>
                                        
                                <div className="col-span-6">
                                    <label htmlFor="CEP" className="field-label">CEP</label>
                                    <input
                                        {...register('cep')}
                                        type="text" name="cep" id="cep" className="field-text w-48 lg:w-48" />
                                </div>

                                <div className="col-span-4">
                                    <label htmlFor="street_address" className="field-label">Endereço</label>
                                    <input
                                        {...register('endereco')}
                                        type="text" name="endereco" id="endereco" className="field-text" />
                                </div>
                                
                                <div className="col-span-2 sm:col-span-2">
                                    <label htmlFor="country" className="field-label">Estado</label>
                                        <select 
                                            {...register('estado')}
                                            id="estado" name="estado" className="mt-1 relative flex w-24 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                                            <option>AP</option>
                                            <option>BA</option>
                                            <option>PA</option>
                                            <option>MA</option>
                                        </select>
                                        <p className='text-sm text-red-500 mt-1'>{errors.estado?.message}</p>
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                    <label htmlFor="cidade" className="field-label">Cidade</label>
                                    <input
                                        {...register('municipio')}
                                        type="text" name="municipio" id="municipio" className="field-text" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                    <label htmlFor="complemento" className="field-label">Complemento</label>
                                    <input
                                        {...register('complemento')}
                                        type="text" name="complemento" id="complemento" className="field-text" />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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

export default Empresa