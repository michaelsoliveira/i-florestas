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

type EmpresaIndex = {
    id: string;
}

const AddEdit = ({ id }: EmpresaIndex) => {
    const router = useRouter()
    const isAddMode = !id
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()

    const validationSchema = Yup.object().shape({
        razao_social:
            Yup.string()
                .min(3, "Razão Social deve ter no minimo 3 caracteres")
                .max(100, "Razão Social deve ter no máximo 100 caracteres")
                .required('O campo Razão Social é obrigatório '),
        nome_fantasia:
            Yup.string()
                .nullable()
                .transform(value => (!value ? null : value))
                .min(3, "Nome Fantasia deve ter no minimo 3 caracteres")
                .max(100, "Nome Fantasia deve ter no máximo 100 caracteres"),
        resp_tecnico:
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

    const loadEmpresa = useCallback(async () => {
            
        if (!isAddMode && typeof session !== typeof undefined) {

            const { data } = await client.get(`/empresa/${id}`)
            
            for (const [key, value] of Object.entries(data)) {
                setValue(key, value, {
                    shouldValidate: true,
                    shouldDirty: true
                }) 
            }
        }
    }, [client, isAddMode, session, setValue, id])
    
    useEffect(() => {        
        loadEmpresa()
    }, [loadEmpresa])

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createEmpresa(data)
                : updateEmpresa(id, data)
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function createEmpresa(data: any) {
        await client.post('/empresa', data)
            .then((response: any) => {
                const { error, message } = response.data

                if (error) {
                    alertService.error(message)
                } else {
                    const empresa = response.data
                    alertService.success(`Empresa ${empresa?.razao_social} cadastrada com SUCESSO!!!`);
                    router.push('/empresa')
                }
            }) 
    }

    async function updateEmpresa(id: string, data: any) {
        
        await client.put(`/empresa/${id}`, data)
            .then((response: any) => {
                const empresa = response.data
                alertService.success(`Empresa ${empresa?.razao_social} atualizada com SUCESSO!!!`);
                router.push('/empresa')
            })
    }
    
    return (
        <div className="px-4 py-4">
            <div className="mt-10 sm:mt-0">
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
                                    <label htmlFor="razao_social" className={styles.fieldLabel}>*Razão Social</label>
                                    <input
                                        {...register('razao_social')}
                                        // value={state.razaoSocial}
                                        // onChange={handleChange}
                                        required
                                        name="razao_social"
                                        type="text" id="razao_social" className={styles.fieldText} />
                                        <p className='text-sm text-red-500 mt-1'>{errors.razao_social?.message}</p>
                                </div>
                                            
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="nome_fantasia" className={styles.fieldLabel}>Nome Fantasia</label>
                                    <input
                                        {...register('nome_fantasia')}
                                        // value={state.nomeFantasia}
                                        // onChange={handleChange}
                                        type="text" name="nome_fantasia" id="nome_fantasia" className={styles.fieldText} />
                                        <p className='text-sm text-red-500 mt-1'>{errors.nome_fantasia?.message}</p>
                                </div>
                                
                                <div className="col-span-6 sm:col-span-3 w-48">
                                    <label htmlFor="cnpj" className={styles.fieldLabel}>CNPJ</label>
                                    <input
                                        {...register('cnpj')}
                                        // value={state.nomeFantasia}
                                        // onChange={handleChange}
                                        type="text" name="cnpj" id="cnpj" className={styles.fieldText}/>
                                        <p className='text-sm text-red-500 mt-1'>{errors.cnpj?.message}</p>
                                    </div>
                                    
                                    <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="resp_tecnico" className={styles.fieldLabel}>Registro Ambiental</label>
                                    <input
                                        {...register('reg_ambiental')}
                                        // value={state.respTecnico}
                                        // onChange={handleChange}
                                        type="text" name="reg_ambiental" id="regAmbiental" className={styles.fieldText} />
                                        <p className='text-sm text-red-500 mt-1'>{errors.reg_ambiental?.message}</p>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="resp_tecnico" className={styles.fieldLabel}>Responsável Técnico</label>
                                    <input
                                        {...register('resp_tecnico')}
                                        // value={state.respTecnico}
                                        // onChange={handleChange}
                                        type="text" name="resp_tecnico" id="respTecnico" className={styles.fieldText} />
                                        <p className='text-sm text-red-500 mt-1'>{errors.resp_tecnico?.message}</p>
                                </div>
                                
                                <div className="col-span-6 sm:col-span-2">
                                    <label htmlFor="crea_resp" className={styles.fieldLabel}>CREA Responsável</label>
                                    <input
                                        {...register('crea_resp')}
                                        // value={state.respTecnico}
                                        // onChange={handleChange}
                                        type="text" name="crea_resp" id="creaResp" className={styles.fieldText} />
                                        <p className='text-sm text-red-500 mt-1'>{errors.crea_resp?.message}</p>
                                </div>
                                        
                                <div className="col-span-6 w-48 lg:w-48">
                                    <label htmlFor="CEP" className={styles.fieldLabel}>CEP</label>
                                    <input
                                        {...register('cep')}
                                        type="text" name="cep" id="cep" className={styles.fieldText} />
                                </div>

                                <div className="col-span-4">
                                    <label htmlFor="street_address" className={styles.fieldLabel}>Endereço</label>
                                    <input
                                        {...register('endereco')}
                                        type="text" name="endereco" id="endereco" className={styles.fieldText} />
                                </div>
                                
                                <div className="col-span-2 sm:col-span-2">
                                    <label htmlFor="country" className={styles.fieldLabel}>Estado</label>
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
                                    <label htmlFor="municipio" className={styles.fieldLabel}>Cidade</label>
                                    <input
                                        {...register('municipio')}
                                        type="text" name="municipio" id="municipio" className={styles.fieldText} />
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                    <label htmlFor="complemento" className={styles.fieldLabel}>Complemento</label>
                                    <input
                                        {...register('complemento')}
                                        type="text" name="complemento" id="complemento" className={styles.fieldText} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <Link href="/empresa" className="text-center w-40 bg-gray-200 text-sm font-medium text-green-800 p-3 rounded-md">Voltar</Link>
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