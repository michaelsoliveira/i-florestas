
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import Tabs from '../components/Tabs'
import Logo from '../components/Logo'
import { Carousel } from '../components/home/Carousel'
import Hero from '../components/home/Hero'

export default function Dashboard({ localSession }: any) {
  
  return (
    
    <div className="w-full">
      <div className="relative flex flex-row lg:flex-col lg:overflow-hidden">
        <div className="mx-auto mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-12">
          <div className="w-full relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-6xl lg:pb-16">
          <div className='flex flex-col lg:flex-row border shadow-lg'>
            <div className='flex flex-row mx-auto'>
              <Hero session={localSession}/>
            </div>
            <div className="mx-auto text-center items-center inset-y-0 h-full my-auto py-4 px-4">
                
                <Image
                    className="object-cover object-center"
                    src="/web_devices.svg"
                    alt=""
                    width={400}
                    height={300}
                />
              </div>
          </div>
          <div className="text-center lg:flex lg:flex-col py-4">
            <h2 className="text-3xl leading-8 font-semibold mt-5 text-green-800">
              Recursos
            </h2>
              <Carousel />              
          </div>
          <div className='max-w-md lg:max-w-lg md:max-w-md sm:text-center mx-auto'>
              {!localSession && 
              (
                <div>
                  <h2 className="text-3xl leading-8 font-semibold mt-2 text-green-800">
                    Vamos testar!
                  </h2>
                  <Tabs />
                </div>
              )
                
            }   
          </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const session = await getSession(ctx)
  
  return {
    props: {
      localSession: session
    }
  }
}

