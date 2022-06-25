import { GetServerSideProps } from "next"
import { RegisterForm } from "../../../../components/RegisterForm"
import withAuthentication from "../../../../components/withAuthentication"

type IAddUserToEmpresa = {
    empresaId: string;
}
const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
  button:
    ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
  errorMsg: 'text-red-500 text-sm',
}

export const AddUserToEmpresa = ({ empresaId }: IAddUserToEmpresa) => {
    return (
        <div className="bg-white shadow-lg rounded-xl px-4 py-2 w-1/3 mx-auto my-6">
            <RegisterForm styles={styles} empresaId={empresaId} redirect={false} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    const empresaId = params?.empresa
    // const client = 
    return {
        props: {
            empresaId
        }
    }
}

export default withAuthentication(AddUserToEmpresa)