import { useContext, useEffect } from "react"
import { AuthContext } from "contexts/AuthContext"
import { ProjetoContext } from "contexts/ProjetoContext"
import { useSession } from "next-auth/react"
import { GetServerSideProps } from "next"

export const ProjetoIndex = ({ currentProjetos }: any) => {
    const { client } = useContext(AuthContext)
    const { projeto, setProjeto } = useContext(ProjetoContext)
    const { data: session } = useSession()

    useEffect(() => {
        // projetos = await client.get('')
    }, [])
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
    return {
      props: {

      },
    }
  }