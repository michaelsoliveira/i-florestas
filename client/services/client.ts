import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import { useMemo } from 'react';

const useClient = (options?: any) => {
  const { data: session } = useSession();
  
  const token = session?.accessToken;
  // const handleError = useErrorHandler();

  return useMemo(() => {
    
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ...(options?.headers ? options.headers : {})
        }
        
    });
    
    api.interceptors.response.use(response => {
        return response
    }, error => {
        try {
          const { status, data } = error.response
        
          if (status === 401) {
              signOut()
              return Promise.reject(data);
          } else if (status === 405) {
            return Promise.reject(data);
            
          }
          return Promise.reject(error)
        } catch (e) {
          console.log(e)
          return Promise.reject(error)
        }
    })
          
    return api;
  }, [options, token]);
};

export default useClient;