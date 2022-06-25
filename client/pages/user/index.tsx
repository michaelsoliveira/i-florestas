import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export default RegisterForm

function RegisterForm() {
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
  return (
    <form className="max-w-sm mx-auto rounded-lg shadow-xl overflow-hidden p-6 space-y-10">
    <h2 className="text-2xl font-bold text-center">Login</h2>
    <div className="outline relative border-2 focus-within:border-blue-500">
        <input type="text" name="username" placeholder=" " className="block p-4 w-full text-lg appearance-none focus:outline-none bg-transparent" />
        <label className="absolute top-0 text-lg bg-white p-4 -z-1 duration-300 origin-0">Username</label>
    </div>
    <div className="outline relative border-2 focus-within:border-blue-500">
        <input type="email" name="email" placeholder=" " className="block p-4 w-full text-lg appearance-none focus:outline-none bg-transparent" />
        <label className="absolute top-0 text-lg bg-white p-4 -z-1 duration-300 origin-0">Email</label>
    </div>
    <div className="outline relative border-2 focus-within:border-blue-500">
        <input type="password" name="password" placeholder=" " className="block p-4 w-full text-lg appearance-none focus:outline-none bg-transparent" />
        <label className="absolute top-0 text-lg bg-white p-4 -z-1 duration-300 origin-0">Password</label>
    </div>
      </form>
  )
}