'use client'

import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react'
import classNames from 'classnames';
import Login from './Login'
import { AddEdit } from '@/components/user/AddEdit'
import React, { createRef } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline';

const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 w-[22.5em] appearance-none',
  button:
    ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
  errorMsg: 'text-red-500 text-sm',
}

const Tabs = ({ index }: { index?: number }) => {
  const formRef = createRef<any>()

  const submitForm = () => {
    if (formRef.current) {
        formRef.current.handleSubmit()
    }
  }

  useEffect(() => {
      index && setSelectedIndex(index)
  }, [index])
  
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="w-full py-4">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex p-1 space-x-2 bg-custom-green/50 rounded-lg">
            <Tab
              className={({ selected }) =>
                classNames(
                  'font-medium w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-custom-green ring-white ring-opacity-60',
                  selected
                    ? 'bg-custom-green/75 text-white shadow hover:bg-gray-50/50 hover:text-custom-green'
                    : 'text-custom-green hover:bg-custom-green/50 hover:text-white'
                )
              }
            >
              <span className='font-bold'>Login</span>
          </Tab>
          <Tab
              className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-custom-green ring-white ring-opacity-60',
                selected
                  ? 'bg-custom-green/75 text-white shadow hover:bg-gray-50/50 hover:text-custom-green'
                  : 'text-custom-green hover:bg-custom-green/50 hover:text-white'
              )
              }
            >
              <span className='font-bold'>Cadastro</span>
            </Tab>
        </Tab.List>
        <Tab.Panels>
            <Tab.Panel
              className={classNames(
                'px-4 py-2 text-left justify-center items-center'
              )}
            >
            <Login /> 
          </Tab.Panel>
          <Tab.Panel
              className={classNames(
                'px-4 py-2 text-left justify-center items-center'
              )}
            >
              <div className="flex flex-col items-center justify-between w-full">
              
              <AddEdit ref={formRef} styles={styles} redirect/>
              
                <button
                  onClick={submitForm}
                  disabled={formRef.current?.isSubmitting}
                  type="submit"
                  className="my-4 group relative w-3/4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <UserCircleIcon className="h-5 w-5 text-green-500 group-hover:text-green-400" aria-hidden="true" />
                  </span>
                  Cadastrar
                </button>
              </div>
              
              
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs