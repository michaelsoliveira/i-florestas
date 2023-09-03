'use client'

import Image from 'next/image'
import { Carousel } from 'src/components/home/Carousel'
import Hero from 'src/components/home/Hero'
import { useSession } from 'next-auth/react'
import Team from 'src/components/home/Team'

export default function Dashboard() {
  
  const { data: session } = useSession()

  return (
    
    <div className="w-full items-center justify-center">
      <div className="relative flex flex-row lg:flex-col lg:overflow-hidden">
        <div className="w-full mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-12">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-16">
          <div className="flex flex-col lg:flex-row border shadow-lg h-96 lg:h-[32rem] md:h-[25rem]" 
            style={{
              backgroundImage: `url("/imgs/Hero.png")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: `95%`,
              backgroundPosition: 'center'             
            }}
          >
            <div className='flex flex-row mx-auto'>
              <Hero session={session}/>
            </div>
            
          </div>
          <Carousel />              
          <div className="border shadow-lg text-center flex flex-col py-4 mt-4">
            {/* <h2 className="text-3xl leading-8 font-semibold mt-5 text-green-800">
              Recursos
            </h2> */}
            <div className='mx-auto text-center items-center inset-y-0 h-full my-auto px-4 pb-10'>
            <Image
                  className="object-cover object-center"
                  src="/imgs/brasao.png"
                  alt=""
                  width={175}
                  height={200}
              /> 
            </div>
            <div className="mx-auto text-center items-center inset-y-0 h-full my-auto px-4">
               
              <Image
                  className="object-cover object-center"
                  src="/imgs/Parceiros.png"
                  alt=""
                  width={900}
                  height={300}
              />
            </div>
              
          </div>
          
          {/* {!session && 
              (<div>
                <div className="text-center lg:flex lg:flex-col py-4">
                  <Team />
                </div>
            </div>
           )}  */}
        </div>
      </div>
    </div>
      
    </div>
  )
}