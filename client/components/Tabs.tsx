import { useState } from 'react';
import { Tab } from '@headlessui/react'
import classNames from 'classnames';
import Login from './Login'
import { RegisterForm } from './RegisterForm'

const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
  button:
    ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
  errorMsg: 'text-red-500 text-sm',
}

const Tabs = () => {
  
  return (
    <div className="w-full py-4">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-2 bg-green-900/20 rounded-lg">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-green-700 text-white shadow'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-700'
                )
              }
            >
              Login
          </Tab>
          <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-green-700 text-white shadow'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-green-700'
                )
              }
            >
              Cadastro
            </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'bg-white shadow-lg rounded-xl px-6 py-4',
                // 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-600 ring-white ring-opacity-60'
              )}
          >
              <Login /> 
          </Tab.Panel>
          <Tab.Panel
              className={classNames(
                'bg-white shadow-lg rounded-xl px-4 py-2 text-left',
                // 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-600 ring-white ring-opacity-60'
              )}
            >
              <RegisterForm styles={styles} redirect={true}/>
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs