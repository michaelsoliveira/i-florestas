'use client'

import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { usePathname } from "next/navigation";

const Footer = () => {

  const index = usePathname() === '/'

  return (
    <footer className="bg-gray-800 text-white">
      {index && (
        <div className="md:flex md:justify-center md:items-center px-20 bg-custom-green py-2">
          <h1
            className="lg:text-xl text-xl md:mb-0 mb-6 lg:leading-normal
          md:w-2/5"
          >
            <span className="text-white">Entre com seu email para mais informações</span>
          </h1>
          <div>
            <input
              type="text"
              placeholder="Entre com seu email para mais informações"
              className="text-gray-800
            sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2 rounded px-2 focus:outline-none"
            />
            <button
              className="bg-teal-600 hover:bg-teal-500 duration-300 px-5 py-2
            rounded-md text-white md:w-auto w-48"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
      
        <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12
      text-center text-gray-400 text-sm pb-4"
      >
        <span>© 2020 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
