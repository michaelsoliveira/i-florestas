import { OAuth2Client } from 'google-auth-library'

export const getDecodedOAuthJwtGoogle = async (token: any) => {

  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)
    
    const tokenInfo = await client.getTokenInfo(token);

    return tokenInfo
  } catch (error) {
    return { status: 500, data: error }
  }
}

export default getDecodedOAuthJwtGoogle