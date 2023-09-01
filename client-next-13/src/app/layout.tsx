'use client'

import "@/app/globals.css"
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '@/context/AuthContext'
import { ProjetoProvider } from "@/context/ProjetoContext"
import { ModalProvider } from "@/context/ModalContext"
import { LoadingProvider } from "@/context/LoadingContext"
import { StepProvider } from "@/context/StepContext"
import { store } from '@/redux/store'
import { saveState } from '@/redux/browser-storage'
import Layout from '@/components/Layout'
import Modal from "@/components/Modal"
import NextNProgress from 'nextjs-progressbar'
import React from 'react'
import { Providers } from "@/redux/provider";

import { ToastContainer } from 'react-toastify'
const { debounce } = require("debounce")

import { NextAuthProvider } from "./providers"

import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce(() => {
      saveState(store.getState());
    }, 800)
  );
  
  return (
    <html lang="en">
      <body className={roboto.className}>
          <Providers>
            <NextAuthProvider>
              <LoadingProvider>
                  <ModalProvider>
                    <ProjetoProvider>
                      <AuthProvider>
                          <StepProvider>
                            <Layout>    
                              <NextNProgress />
                              <Modal />
                              <ToastContainer />   
                                { children }
                            </Layout>
                          </StepProvider>
                      </AuthProvider>
                    </ProjetoProvider>
                  </ModalProvider>
                </LoadingProvider>
            </NextAuthProvider>
            
          </Providers>
      </body>
    </html>
  )
}

export default RootLayout
