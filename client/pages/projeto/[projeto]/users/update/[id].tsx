import { GetServerSideProps } from "next"
import withAuthentication from "components/withAuthentication"
import { RegisterForm } from "components/RegisterForm"
import { useCallback, useContext, useEffect } from "react"
import { AuthContext } from "contexts/AuthContext"
import { styles as styleButton } from "components/Utils/styles"
import { useModalContext } from "contexts/ModalContext"
import Modal from "components/Modal"

const styles = {
        label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
        field:
        'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
        button:
        ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
        errorMsg: 'text-red-500 text-sm',
    }

const EmpresaUpdateUser = ({userId, projetoId}: any) => {
    const { showModal, hideModal, store } = useModalContext()
    const { visible, type } = store
    
    return (
        <div>
            {visible && (<Modal><RegisterForm styles={styles} projetoId={projetoId} redirect={false} userId={userId}/></Modal>)}
        </div>
    )
    
}

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    const projetoId = params?.projeto
    const userId = params?.id
    
    return {
        props: {
            projetoId,
            userId
        }
    }
}

export default withAuthentication(EmpresaUpdateUser)