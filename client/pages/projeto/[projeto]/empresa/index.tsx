import { useContext, useEffect, useState, useCallback } from "react"
import alertService from 'services/alert'
import Modal from "components/Modal"
import withAuthentication from "components/withAuthentication"
import { AuthContext } from "contexts/AuthContext"
import { EmpresaType } from "types/IEmpresa"
import { useModalContext } from "contexts/ModalContext"
import ListEmpresas from "components/empresa"
import { GetServerSideProps } from "next"

const EmpresaIndex = ({ projetoId }: any) => {
    const [empresas, setEmpresas] = useState<EmpresaType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { client } = useContext(AuthContext)

    const loadEmpresas = useCallback(async() => {
        try {
            setIsLoading(true)
            const { data: { empresas } } = await client.get(`/empresa/findAll/${projetoId}`)
            setEmpresas(empresas)    
            setIsLoading(false)
        } catch (error:any) {
            alertService.error(error?.message)
        }
    }, [client, projetoId])

    useEffect(() => {
        loadEmpresas()
    }, [loadEmpresas])

    return (
        <div>
            <ListEmpresas projetoId={projetoId} empresas={empresas} isLoading={isLoading} loadEmpresas={loadEmpresas}/>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const projetoId = params?.projeto
    
    return {
        props: {
            projetoId
        }
    }
}

export default withAuthentication(EmpresaIndex)
