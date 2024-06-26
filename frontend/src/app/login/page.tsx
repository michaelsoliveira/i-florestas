'use client'

import { redirect, useSearchParams } from 'next/navigation';
import Login from '@/components/utils/Login'
import Image from 'next/legacy/image';
import { useSession } from 'next-auth/react'
import { Suspense, useEffect } from 'react';
import Link from 'next/link';

function LoadingLoginPage(){
  return <>Loading Login...</>
}

const Pagelogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl')
  const { data: session } = useSession()
  
  useEffect(() => {
    if (session) {
        redirect(callbackUrl ?? '/')
    }
  }, [callbackUrl, session])
  
  return (
    <div className="min-h-full flex items-center justify-center mt-28 mb-16 px-4">
      <div className="max-w-md flex flex-col justify-center items-center w-full space-y-4 py-4 border rounded-md shadow-2xl">
        <div className='absolute top-28'>
        <div className='bg-gray-50 border border-custom-green rounded-full shadow-lg w-36 h-36'>
        <div className='relative h-full flex flex-col items-center justify-center'>
          <Image src='/imgs/logo_bomanejo.png' width={40} height={40} alt='logo' />
          <h1 className='font-roboto text-md font-semibold text-custom-green'>BOManejoWeb</h1>
          </div>
        </div>
        </div>
        <div className="w-5/6 pt-10">
          <Suspense fallback={<LoadingLoginPage />}>
            <Login />
          </Suspense>
        </div>
        
        <p className='flex items-center py-4 text-center text-sm'>Não tem conta?&nbsp;
          <span className='underline font-bold text-custom-green'> <Link href='/signup'>Cadastre-se</Link></span>
        </p>
        </div>
    </div>
  )
}

export default Pagelogin