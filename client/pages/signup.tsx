import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { RegisterForm } from '../components/RegisterForm'
import Logo from '../components/Logo'
import { getCsrfToken, getSession } from 'next-auth/react'
import Link from 'next/link';

import {styles} from '../components/helpers/defaultStyles'

const Pagelogin = ({ csrfToken }: any) => {

  const router = useRouter()
  
  return (
    <div className="min-h-full flex items-center justify-center my-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md flex flex-col justify-center items-center w-full space-y-4 px-8 py-4 border rounded-md shadow-2xl">
        <div className='flex bg-gray-50 border absolute top-20 border-green-700 justify-center items-center rounded-full shadow-lg w-36 h-36'>
        <div className='relative flex flex-col items-center justify-center'>
          <Logo width='w-16' height='h-16' />
          <h1 className='font-roboto text-xl font-semibold text-green-700'>iFlorestal</h1>
          </div>
        </div>
        <div className='w-full pt-10'>
          <RegisterForm styles={styles}/>
        </div>
        <div className='w-full border-b border-gray-200 flex items-center'>
          <p className='text-xs py-4 flex items-center text-center'>
            Ao se cadastrar, você concordar com nossos Termos de Uso e com a Política de Privacidade
          </p>
        </div>
        <p className='flex items-center text-center text-sm'>Já tem conta?&nbsp;
          <span className='underline font-bold text-green-700'> <Link href='/login'>Faça login</Link></span>
        </p>
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const session = await getSession(ctx)

  if (session) {
      return {
          redirect: {
              destination: '/',
              permanent: false
          }
      }
  }  

  return {
    props: {
      csrfToken: await getCsrfToken(ctx)
    },
  }
}

export default Pagelogin