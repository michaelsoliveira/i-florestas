import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import KeycloakProvider from 'next-auth/providers/keycloak';
import userService from '@/services/user';

const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  });

async function findProvider(token: any) {
  const { name, email, provider, access_token } = token;

  try {
    const dataProvider = {
      username: name,
      email,
      password: Math.random().toString(36).slice(-8),
      image: token?.picture,
      provider,
      id_provider: token?.sub,
      by_provider: true,
    };

    const userExists = await userService.findProvider(token);

    if (userExists) {
      if (!userExists.provider || !userExists.id_provider)
        await userService.update(userExists?.id, dataProvider, access_token);
    } else {
      const user = await userService.create(dataProvider)
        .then(async (res: any) => {
          await userService.sendEmail(dataProvider)
          return res.data
        }).catch((error: any) => {
          console.log(error)
          return null
        })

        return user
    }
    return userExists;
  } catch (error: any) {
    console.log(error.message);
  }
}

async function refreshAccessToken(token: any) {
  const provider = token.provider ? token.provider : 'local';
  
  switch (provider) {
    case 'keycloak': {
      try {
        if (Date.now() > token.refreshTokenExpired) throw Error;
        const details = {
          client_id: process.env.KC_CLIENT_ID,
          client_secret: process.env.KC_CLIENT_SECRET,
          grant_type: ['refresh_token'],
          refresh_token: token.refreshToken,
        };
        const formBody: string[] = [];
        Object.entries(details).forEach(([key, value]: [string, any]) => {
          const encodedKey = encodeURIComponent(key);
          const encodedValue = encodeURIComponent(value);
          formBody.push(encodedKey + '=' + encodedValue);
        });
        const formData = formBody.join('&');
        const url = `${process.env.KC_BASE_URL}/token`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: formData,
        });
        const refreshedTokens = await response.json();
        if (!response.ok) throw refreshedTokens;
        return {
          ...token,
          accessToken: refreshedTokens.access_token,
          accessTokenExpired:
            Date.now() + (refreshedTokens.expires_in - 15) * 1000,
          refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
          refreshTokenExpired:
            Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
        };
      } catch (error) {
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    }
    case 'local': {
      try {
        const refreshToken = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh?userId=${token.user?.id}`,
          {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: null
            // JSON.stringify({
            //   token: token?.refreshToken
            // }),
          }
        ).then((res) => res.json())
        const data = {
          ...token,
          accessToken: refreshToken?.access_token,
          accessTokenExpires: Date.now() + refreshToken?.expires_in * 1000,
          refreshToken: refreshToken?.refresh_token_expired ? refreshToken?.refresh_token : token?.refreshToken,
        }
        
        return data
      } catch (error: any) {
        console.log(error);

        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    }

    case 'google': {
      try {
        const url =
          'https://oauth2.googleapis.com/token?' +
          new URLSearchParams({
            client_id:
              '80208103401-2is5sf9cdimhq4ghphnn75aa4p1b4p20.apps.googleusercontent.com',
            client_secret: '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',
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken,
          });

        const response = await fetch(url, {
          cache: 'no-store',
          body: null,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
          throw refreshedTokens;
        }

        return {
          ...token,
          accessToken: refreshedTokens.access_token,
          accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
          refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
      } catch (error: any) {
        console.log(error);

        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    }

    default: {
      return token;
    }
  }
}

export const authOptions: NextAuthOptions = {
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.NEXTAUTH_SECRET,
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'undefined',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'undefined',
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || 'undefined',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'undefined',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || 'undefined',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'undefined',
    }),
    KeycloakProvider({
      clientId: process.env.KC_CLIENT_ID!,
      clientSecret: process.env.KC_CLIENT_SECRET!,
      issuer: `${process.env.KC_BASE_URL}/realms/bomanejo-realm`,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@bomanejo.online',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }

          const res: any = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { 'Content-Type': 'application/json' },
            }
          );

          const response = await res
            .json()
            .then((data: any) => {
              const { error, message, user } = data
              if (!error) {
                return {
                  error,
                  local: true,
                  ...user,
                }
              }

              return {
                error,
                message,
                user
              }
            })
            .catch((res: any) => {
              console.log(res);
              return res;
            });
            // If no error and we have user data, return it
            if (res.ok && response) {
              return response;
            }
          return null;
        } catch (error: any) {
          const errorMessage = error;
          throw new Error(`${errorMessage}&email=${credentials?.email}`);
        }
      },
    }),
  ],

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60, // 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/login',
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/login', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    newUser: '/user/change-password', // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith('/')) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
    // async redirect(params: { url: string }) {
    //   const { url } = params

    //   // url is just a path, e.g.: /videos/pets
    //   if (!url.startsWith('http')) return url

    //   // If we have a callback use only its relative path
    //   const callbackUrl = new URL(url).searchParams.get('callbackUrl')
    //   if (!callbackUrl) return url

    //   return new URL(callbackUrl as string).pathname
    // },

    async jwt({ token, account, trigger, user, session }: any) {
      // if (trigger === 'update') {
      //   return { ...token, ...session.user };
      // }
      if (user?.local) {
        return {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            image: user.image,
            roles: user.roles,
            projeto_ativo: { id: user.projeto_ativo?.id, nome: user.projeto_ativo?.nome, id_poa_ativo: user.projeto_ativo?.id_poa_ativo },
            poa_ativo: { id: user.poa_ativo?.id, nome: user.poa_ativo?.nome },
          },
          accessToken: user.access_token,
          accessTokenExpires: Date.now() + user.expires_in * 1000,
          refreshToken: user.refresh_token,
        };
      }
      if (account) {
        const dataUser = await findProvider({ ...token, ...account });
        return {
          provider: account.provider,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user: {
            id: user?.id,
            email: user?.email,
            image: user?.image,
            username: user?.name,
            roles: user.roles,
            projeto_ativo: {
              id: dataUser.projeto?.id,
              nome: dataUser.projeto?.nome,
            },
            poa_ativo: {
              id: dataUser.poa_ativo?.id,
              nome: dataUser.poa_ativo?.nome,
            },
          },
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      } 
      
      const data = await refreshAccessToken(token);

      // Access token has expired, try to update it
      return data;
      
    },
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token.user;
      session.user.roles = token.user?.roles;
      session.user.projeto_ativo = token.user?.projeto_ativo,
      session.user.poa_ativo = token.user?.poa_ativo,
      session.provider = token.provider;
      session.id = token.id;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresIn = token.accessTokenExpires;

      return session;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: 'light',
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
};
