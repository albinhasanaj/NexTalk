import AuthForm from '@/components/AuthForm';
import { Fragment } from 'react';

const SignUp = () => {
    return (
        <Fragment>
            <AuthForm
                isLogin={false}
            />
        </Fragment>
    )
}

export default SignUp