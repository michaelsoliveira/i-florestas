'use client';

import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/context/AuthContext';
import { ProjetoProvider } from '@/context/ProjetoContext';
import { PoaProvider } from '@/context/PoaContext';
import { ModalProvider } from '@/context/ModalContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { StepProvider } from '@/context/StepContext';
import { store } from '@/redux/store';
import { saveState } from '@/redux/browser-storage';
import Layout from '@/components/utils/Layout';
import Modal from '@/components/utils/Modal';
import NextNProgress from 'nextjs-progressbar';
import React, { useEffect } from 'react';
import { Providers } from '@/redux/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastContainer } from 'react-toastify';
const { debounce } = require('debounce');

import { NextAuthProvider } from './providers';

import { Roboto } from 'next/font/google';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

function RootLayout({ children }: { children: React.ReactNode }) {
  store.subscribe(
    // we use debounce to save the state once each 800ms
    // for better performances in case multiple changes occur in a short time
    debounce(() => {
      saveState(store.getState());
    }, 800)
  );
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={roboto.className}>
        <Providers>
          <NextAuthProvider>
            <LoadingProvider>
              <ModalProvider>
                <ProjetoProvider>
                  <PoaProvider>
                    <AuthProvider>
                      <StepProvider>
                        <Layout>
                          <NextNProgress />
                          <ToastContainer />
                          <Modal />
                          <QueryClientProvider client={queryClient}>
                            {children}
                          </QueryClientProvider>
                        </Layout>
                      </StepProvider>
                    </AuthProvider>
                  </PoaProvider>
                </ProjetoProvider>
              </ModalProvider>
            </LoadingProvider>
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
