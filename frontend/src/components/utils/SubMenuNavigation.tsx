import { useModalContext } from "@/context/ModalContext"
import { useRef } from "react"
import { ChangeActive as ChangeActiveProjeto } from '../projeto/ChangeActive'
import { ChangeActive as ChangeActivePoa } from '../poa/ChangeActive'
import { styles } from "./styles"


const SubMenuNavigation = ( { subMenu }: { subMenu: any} ) => {
    const { showModal } = useModalContext()
    const formRefProjeto = useRef<any>(null)
    const formRefPoa = useRef<any>(null)

    const changeProjetoAtivo = async () => {
        formRefProjeto.current.handleSubmit()
    }

    const changePoaAtivo = async () => {
        formRefPoa.current.handleSubmit()
    }

    const changeProjetoModal = (e: any) => {
        console.log(e)
        showModal({ title: 'Alterar Projeto Ativo', onConfirm: changeProjetoAtivo, styleButton: styles.greenButton, confirmBtn: 'Ativar Projeto', 
        content: <ChangeActiveProjeto ref={formRefProjeto} /> })
    }

    const changePoaModal = (e: any) => {
        console.log(e)        
        showModal({ title: 'Alterar Poa Ativo', onConfirm: changePoaAtivo ,styleButton: styles.greenButton, confirmBtn: 'Ativar Poa', 
        content: <ChangeActivePoa ref={formRefPoa} /> })
    }

    return (<>
        <p className="font-bold text-gray-dark">{subMenu.name}</p>
        {subMenu?.description && (
            <p className="text-sm text-gray-dark/75">{subMenu?.description}</p>
        )}
    </>)

    
}

export default SubMenuNavigation