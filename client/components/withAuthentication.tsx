import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";

const withAuthentication = (WrappedComponent: any) => {
  const RequiresAuthentication = (props: any) => {
      
      const { data: session, status } = useSession()
      
      const router = useRouter()
      
      useEffect(() => {
        if (typeof session !== typeof undefined) {
            if (!session) {
                router.push('/login')
            }
        }
      }, [router, session]);
      

     // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
      return session ? <WrappedComponent {...props} /> :
          <div className="flex flex-row items-center justify-center w-full h-screen opacity-50 bg-gradient-to-b from-white via-green-100 to-green-800">
              <h1 className="text-green-900 text-2xl">Loading...</h1>
          </div>;
  };

  return RequiresAuthentication;
};

withAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired
};

export default withAuthentication;