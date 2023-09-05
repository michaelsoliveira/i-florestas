'use client'

import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react'
import { redirect } from "next/navigation";

const withAuthentication = (WrappedComponent: any) => {
  const RequiresAuthentication = (props: any) => {
      
      const { data: session, status } = useSession()
      
        if (typeof session !== typeof undefined) {
            if (status !== 'authenticated') {
              redirect('/login')
            }
        }
      

     // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
      return session ? <WrappedComponent {...props} />  : <div></div>

  };

  return RequiresAuthentication;
};

withAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired
};

export default withAuthentication;