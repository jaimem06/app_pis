import { useForm } from 'react-hook-form'
import { useAuth } from '../contexto/authcontext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fredUnlogo from '../../public/fred.png';


function PaginaLogin() {
    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();
 
   
    
const {signin,errors:signinErrors,isAuthenticated,logout} =  useAuth();
const navigate = useNavigate();
useEffect(() => {
    if(isAuthenticated)navigate("/fred");// la ruta a la que se redirige
}, [isAuthenticated]) 
const onSubmit = handleSubmit((data) => { 
        signin(data) })
        
    return (
        <div className= 'divGeneral' style={{background: '#2a2e30'}}>
        <div className='flex h-screen items-center justify-center'>
        <img src = '../../public/fred.png' style={{marginRight: '10%'}} />
            <div className = 'bg-white max-w-md w-full p-10 rounded-md'>
            {
            signinErrors.map((error,i) => (
                <div className="bg-red-500 p-2 text-white text-center m-2" key={i}>
                    {error}
                </div>  
            ))
            } 
                <h1 className='text-2xl text-center text-black'>Login</h1>
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
                    <div style= {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <button type="submit" style = {{background: '#2a2e30',padding: '10px',borderRadius: '10px',marginTop: '10px',width: '35%'}}>
                        Login</button>
                    </div>                   
                    
                </form>
                
            </div>
            </div>
        </div>
    )
}

export default PaginaLogin;