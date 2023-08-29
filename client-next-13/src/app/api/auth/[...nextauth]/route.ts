import NextAuth from "next-auth"
import { authOptions } from "@/lib/authOptions"

// const Auth = async (req: NextApiRequest, res: NextApiResponse) => {  
//   return NextAuth(req, res, authOptions)
// }

// export default Auth

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }