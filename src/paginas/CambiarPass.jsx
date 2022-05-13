import { useState } from 'react';
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from '../hooks/useAuth';

const CambiarPass = () => {

    const { guardarPass } = useAuth(); 
    const [alerta, setAlerta] = useState({});
    const [pass, setPass] = useState({

        pass: '',
        passNew: ''
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(Object.values(pass).every(campo => campo === '')){
            
            setAlerta({msg: 'Todos los campos son obligatorios', error: true});
            return;
        }

        if(pass.passNew.length < 6){

            setAlerta({msg: 'La contraseña debe de tener minimo 6 caracteres', error: true});
            return;
        }

        const respuesta = await guardarPass(pass);

        setAlerta(respuesta);

    }

    const { msg } = alerta;

    return (

        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {' '} <span className="text-indigo-600 font-bold">Contraseña</span></p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {msg && <Alerta alerta={alerta}/>}
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="pass" className="uppercase font-bold text-gray-600">Contraseña Actual</label>
                            <input 
                            type="password" 
                            className="border bg-gray-50 w-full pt-2 mt-5 rounded-lg" 
                            name="pass"
                            placeholder="Escribe la contraseña actual"
                            onChange={ e => setPass({

                                ...pass,
                                [e.target.name]: e.target.value
                            })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="passNew" className="uppercase font-bold text-gray-600">Nueva Contraseña</label>
                            <input 
                            type="password" 
                            className="border bg-gray-50 w-full pt-2 mt-5 rounded-lg" 
                            name="passNew"
                            placeholder="Escribe tu nueva contraseña"
                            onChange={ e => setPass({

                                ...pass,
                                [e.target.name]: e.target.value
                            })}
                            />
                        </div>
                        <input type="submit" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5" value="Actualizar Contraseña"/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CambiarPass