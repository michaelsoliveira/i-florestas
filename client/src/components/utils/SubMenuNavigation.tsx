import { useModalContext } from "@/context/ModalContext"
import { createRef } from "react"
import { ChangeActive as ChangeActiveProjeto } from '../projeto/ChangeActive'
import { ChangeActive as ChangeActivePoa } from '../poa/ChangeActive'
import { styles } from "./styles"


const SubMenuNavigation = ( { subMenu }: { subMenu: any} ) => {
    const { showModal } = useModalContext()
    const formRefProjeto = createRef<any>()
    const formRefPoa = createRef<any>()

    const changeProjetoAtivo = async () => {
        formRefProjeto.current.handleSubmit()
    }

    const changePoaAtivo = async () => {
        formRefPoa.current.handleSubmit()
    }

    const changeProjetoModal = () => {
        showModal({ title: 'Alterar Projeto Ativo', onConfirm: changeProjetoAtivo, styleButton: styles.greenButton, confirmBtn: 'Ativar Projeto', 
        content: <ChangeActiveProjeto ref={formRefProjeto} /> })
    }

    const changePoaModal = () => {
        showModal({ title: 'Alterar Poa Ativo', onConfirm: changePoaAtivo ,styleButton: styles.greenButton, confirmBtn: 'Ativar Poa', 
        content: <ChangeActivePoa ref={formRefPoa} /> })
    }

    switch(subMenu?.name) {
        case 'change_projeto': {
            return (<>
                <div
                    className='flex flex-row space-x-4 font-bold text-custom-green hover:cursor-pointer'
                    onClick={changeProjetoModal}
                >
                    {/* <div>
                        {subMenu?.icon && (
                            <subMenu.icon className="flex-shrink-0 h-6 w-6 text-custom-green" aria-hidden="true" />
                        )}
                    </div> */}
                    <span>
                        Mudar projeto ativo
                    </span>
                </div>
            </>)
        }
        case 'change_poa' : {
            return (<>
                <div
                    className='flex flex-row space-x-4 font-bold text-custom-green hover:cursor-pointer'
                    onClick={changePoaModal}
                >
                    {/* <div>
                        {subMenu?.icon && (
                            <subMenu.icon className="flex-shrink-0 h-6 w-6 text-custom-green" aria-hidden="true" />
                        )}
                    </div> */}
                    <span>
                        Mudar poa ativo
                    </span>
                </div>
            </>)
        }
        
        default: {
            return (<>
                <p className="font-bold text-gray-dark">{subMenu.name}</p>
                {subMenu?.description && (
                    <p className="text-sm text-gray-dark/75">{subMenu?.description}</p>
                )}
            </>)
        }

    }
}

export default SubMenuNavigation