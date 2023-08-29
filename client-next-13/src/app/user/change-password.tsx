import { ChangePassword } from "src/components/user/ChangePassword"
import withAuthentication from "src/components/withAuthentication"

const ChangePasswordPage = () => {
    return (
        <div>
            <ChangePassword />
        </div>
    )
}

export default withAuthentication(ChangePasswordPage)