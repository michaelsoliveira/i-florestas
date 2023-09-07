'use client'

import { ChangePassword } from "src/components/user/ChangePassword"
import withAuthentication from "@/components/utils/withAuthentication"

const ChangePasswordPage = () => {
    return (
        <div>
            <ChangePassword />
        </div>
    )
}

export default withAuthentication(ChangePasswordPage)