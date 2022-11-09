import { useContext, useEffect, useState, useCallback } from "react"
import alertService from 'services/alert'
import Modal from "components/Modal"
import withAuthentication from "components/withAuthentication"
import { AuthContext } from "contexts/AuthContext"
import { EmpresaType } from "types/IEmpresa"
import Empresas from "@/components/empresa/Index"
import { useModalContext } from "contexts/ModalContext"

const EmpresaIndex = () => {
    const [empresas, setEmpresas] = useState<EmpresaType[]>([])
    const [selectedEmpresa, setSelectedEmpresa] = useState<EmpresaType>()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { client } = useContext(AuthContext)

    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store

    const loadEmpresas = useCallback(async() => {
        try {
            setIsLoading(true)
            const { data: { empresas } } = await client.get('empresa')
            console.log(empresas)
            setEmpresas(empresas)    
            setIsLoading(false)
        } catch (error:any) {
            alertService.error(error?.message)
        }
    }, [client])

    useEffect(() => {
        loadEmpresas()
    }, [loadEmpresas])

    return (
        <div>
            {visible && (<Modal />)}
            <Empresas empresas={empresas} isLoading={isLoading} loadEmpresas={loadEmpresas}/>
        </div>
    )
}

export default withAuthentication(EmpresaIndex)
