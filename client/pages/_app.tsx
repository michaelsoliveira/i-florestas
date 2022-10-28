import "tailwindcss/tailwind.css"
// import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'contexts/AuthContext'
import { ProjetoProvider } from "contexts/ProjetoContext"
import { ModalProvider } from "contexts/ModalContext"
import { Provider } from 'react-redux'
import { store } from 'store'
import { saveState } from 'store/browser-storage'
import Layout from 'components/Layout'
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react'
import { debounce } from "debounce"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce(() => {
      saveState(store.getState());
    }, 800)
  );
  
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
          <ModalProvider>
            <ProjetoProvider>
              <AuthProvider>
                <Layout>
                <ToastContainer />
                  <Component {...pageProps} />  
                  {/* <Script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></Script> */}
                  </Layout>
              </AuthProvider>
            </ProjetoProvider>
          </ModalProvider>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
