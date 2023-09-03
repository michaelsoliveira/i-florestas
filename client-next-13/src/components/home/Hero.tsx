'use client'

import { useModalContext } from "@/context/ModalContext"
import Tabs from "../Tabs"

const Hero = ({ session }: any) => {
    const { showModal } = useModalContext()

    const showLogin = () => {
        showModal({
            type: 'submit', hookForm: 'hook-form', options: false, content: <Tabs />
        })
    }

    return (
        <div className="mx-auto px-6 py-8">
            <div>
                <div className="flex items-center justify-center text-center">
                <h1 className="flex flex-col text-2xl tracking-tight font-bold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl">
                    <span className="block text-custom-green xl:inline">BOManejo Web</span>{' '}
                    <span className="block text-xl text-gray-dark xl:inline">Inventário Florestal Sustentável</span>
                </h1>
                </div>
                <p className="hidden md:flex roboto mt-2 text-justify text-base text-gray-dark sm:mt-5 max-w-lg lg:max-w-3xl md:mt-3 mb-4">
                    O setor florestal brasileiro precisa – e demanda – de softwares que agilizem e aprimorem o processo de planejamento
                    florestal, auxiliando na seleção de árvores de corte com base em critérios claros, proporcionando melhor controle
                    sobre a produção de madeira e possibilitando o manejo florestal sustentável.
                </p>
            </div>
            {!session && (
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="">
                    <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-custom-green transition transition-all duration-500 hover:opacity-75 md:py-4 md:text-lg md:px-10"
                        onClick={showLogin}
                    >
                        Iniciar
                    </a>
                    </div>
                
                </div>
            )}
        </div>
    )
}

export default Hero