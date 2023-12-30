import { useForm } from 'react-hook-form'
import { useAuth } from '../contexto/authcontext';

function PaginaLogin() {
    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
const {signin,errors:signinErrors} =  useAuth();
const onSubmit = handleSubmit((data) => { 
        signin(data) })

        
    return (
        <div className='flex h-screen items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            {
            signinErrors.map((error,i) => (
                <div className="bg-red-500 p-2 text-white text-center" key={i}>
                    {error}
                </div>  
            ))
            } 
                <h1 className='text-2xl text-center text-white'>Login</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("email", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Correo"
                    />
                    {
                        errors.email && <p className="text-red-500">Email Requerido</p>
                    }
                    <input type="password" {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Contraseña"
                    />
                    {
                        errors.password && <p className="text-red-500">Contraseña Requerida</p>
                    }
                    <button type="submit">
                        Login</button>
                </form>
            </div>
        </div>
    )
}

export default PaginaLogin;