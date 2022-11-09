import { useContext, useEffect, useState, useCallback } from "react"
import alertService from 'services/alert'
import Modal from "components/Modal"
import withAuthentication from "components/withAuthentication"
import { AuthContext } from "contexts/AuthContext"
import { EmpresaType } from "types/IEmpresa"
import { ListEmpresas } from "@/components/empresa"
import { useModalContext } from "contexts/ModalContext"

const EmpresaIndex = () => {
    const [empresas, setEmpresas] = useState<EmpresaType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { client } = useContext(AuthContext)

    const { store } = useModalContext()
    const { visible } = store

    const loadEmpresas = useCallback(async() => {
        try {
            setIsLoading(true)
            const { data: { empresas } } = await client.get('empresa')
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
            <ListEmpresas empresas={empresas} isLoading={isLoading} loadEmpresas={loadEmpresas}/>
        </div>
    )
}

export default withAuthentication(EmpresaIndex)
