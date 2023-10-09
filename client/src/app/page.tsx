'use client'

import Image from 'next/image'
import { Carousel } from 'src/components/home/Carousel'
import Hero from 'src/components/home/Hero'
import { useSession } from 'next-auth/react'
import Team from 'src/components/home/Team'
import useWindowDimensions from '@/components/utils/useWindowDimensions'
import { useEffect, useState } from 'react'
import classNames from '@/components/utils/classNames'

export default function Dashboard() {
  
  const { data: session } = useSession()
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(width)
    }
  }, [width])
  return (

    <div className="w-full items-center justify-center mx-auto max-w-7xl">
      <div className="mx-auto relative flex flex-row lg:flex-col lg:overflow-hidden">
        <div className="w-full mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-12">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-16">
            <div className="flex flex-col lg:flex-row border shadow-lg h-72 md:h-[26em] object-cover object-center items-center justify-center" 
              style={{
                backgroundImage: `url("/imgs/hero_bomanejo.jpeg")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${windowWidth > 800 ? '100%' : '140%'} `,
                backgroundPosition: 'center'             
              }}
            >
            <div className={classNames(
              'flex flex-row mx-auto bg-white/75 rounded-lg mt-4 items-center',
              session ? 'h-32 md:h-56' : 'h-48 md:h-[20rem] lg:h-64'
              )}
            >
              <Hero session={session}   />
            </div>
            
          </div>
          <Carousel />              
          <div className="border shadow-lg text-center flex flex-col py-4 mt-4">
            {/* <h2 className="text-3xl leading-8 font-semibold mt-5 text-green-800">
              Recursos
            </h2> */}
            <div className='mx-auto text-center items-center inset-y-0 h-full px-4 pb-10'>
            <Image
                  className="object-cover object-center"
                  src="/imgs/brasao.png"
                  alt=""
                  width={175}
                  height={200}
              /> 
            </div>
            <div className="mx-auto text-center items-center inset-y-0 h-full px-4">
               <h2 className="leading-8 font-semibold mt-5 text-gray-dark">
                Parceiros
              </h2>
              <Image
                  className="object-cover object-center"
                  src="/imgs/Parceiros.png"
                  alt="Parceiros"
                  width={900}
                  height={300}
              />
            </div>
              
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}