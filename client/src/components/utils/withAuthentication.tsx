'use client'

import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react'
import { redirect } from "next/navigation";

const withAuthentication = (WrappedComponent: any) => {
  const RequiresAuthentication = (props: any) => {
      // const router = useRouter()
      const { data: session, status } = useSession()
      
        if (typeof session !== typeof undefined) {
            if (status !== 'authenticated') {
              return redirect(`/login?callbackUrl=${window.location.pathname}`)
            }
        }
      

     // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
      return session && <WrappedComponent {...props} />

  };

  return RequiresAuthentication;
};

withAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired
};

export default withAuthentication;