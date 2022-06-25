import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import { useMemo } from 'react';
// import { getSession } from 'next-auth/react'

const useClient = (options?: any) => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  // const handleError = useErrorHandler();

  return useMemo(() => {
    const api = axios.create({
      baseURL: 'http://192.168.1.105:3333',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ...(options?.headers ? options.headers : {})
        }
        
    });
    
    api.interceptors.response.use(response => {
        return response
    }, error => {
        const { status } = error.response
        
        if (status === 401) {
            signOut()
            // return location.href = '/'
        }
        
        return Promise.reject(error)
    })
          
    return api;
  }, [options, token]);
};

export default useClient;