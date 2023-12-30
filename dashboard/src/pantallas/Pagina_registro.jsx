import { useForm } from "react-hook-form";
import { useAuth } from "../contexto/authcontext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function PaginaRegistro() {

    const {register, handleSubmit , 
        formState:{errors},
    } = useForm();
    const {signup,isAuthenticated,errors:RegisterErrors} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated)navigate("/login");// la ruta a la que se redirige
    }, [isAuthenticated])
    const onSubmit = handleSubmit(async(values) =>{ 
    signup(values);
    });    
    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
           {
            RegisterErrors.map((error,i) => (
                <div className="bg-red-500 p-2 text-white" key={i}>
                    {error}
                </div>  
            ))
            } 
           <form onSubmit={onSubmit}>
            <input type="text" {...register("name" , {required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre"
            />
            {
                errors.name && <p className="text-red-500">Nombre Requerido</p>
            }
            <input type="text" {...register("email" , {required:true})}
             className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
             placeholder="Correo"
             />
             {
                errors.email && <p className="text-red-500">Email Requerido</p>
            }
            <input type="password" {...register("password",{required:true})}
             className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
             placeholder="Contraseña"
             />
             {
                errors.password && <p className="text-red-500">Contraseña Requerida</p>
            }
            <input type="text" {...register("dob",{required:true})}
             className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
             placeholder="Fecha de nacimiento"
             />
             {
                errors.name && <p className="text-red-500">Fecha Requerida</p>
            }
            <button type="submit">
                Registrar</button>
           </form>
           
        </div>
    )
}

export default PaginaRegistro;