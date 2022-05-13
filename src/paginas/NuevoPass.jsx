import { useState, useEffect } from "react";
import {useParams, Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clientAxios from "../config/axios";

const NuevoPass = () => {

    const [password, setPassword] = useState('');
    const [passRepeated, setPassRepeated] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passModificado, setPassModificado] = useState(false);

    const params = useParams();
    const {token} = params;

    useEffect(() => {

        const comprobarToken = async () => {

            try {

                await clientAxios(`/veterinarios/recoverPassword/${token}`);

                setAlerta({msg: 'Coloca tu nuevo Password'});
                setTokenValido(true);

            } catch (error) {
                
                setAlerta({msg: 'Hubo un error en el enlace', error: true});
            }

        }

        comprobarToken();


    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(password == '' || password.length < 6){

            setAlerta({msg: 'Contraseña debe ser minimo de 6 caracteres', error: true});
            return;
        }

        if(password !== passRepeated){

            setAlerta({msg: 'Las contraseñas no coinciden', error: true});
            return;
        }

        try {

            const url = `/veterinarios/recoverPassword/${token}`;
            const {data} = await clientAxios.post(url, {password});

            console.log(data);
            setAlerta({msg: data.msg});
            setPassModificado(true);
            
        } catch (error) {
            
            setAlerta({msg: error.response.data.msg, error: true});
        }

    }

    const {msg} = alerta;

    return (
        
        <>
            <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Reestablece tu contraseña y no pierdas acceso tus 
                <span className="text-black"> pacientes</span>
            </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta 
                    alerta={alerta}
                />}
                {tokenValido && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">Nueva Contraseña</label>
                                <input 
                                type="password" 
                                placeholder="Tu contraseña" 
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">Repite tu contraseña</label>
                                <input 
                                type="password" 
                                placeholder="Repite tu contraseña" 
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                value={passRepeated}
                                onChange={e => setPassRepeated(e.target.value)}
                                />
                            </div>
                            <input type="submit" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover: cursor-pointer hover:bg-indigo-800 md:w-auto" value="Modificar"/>
                        </form>
                        {passModificado && (<Link className="block text-center my-5 text-gray-500" to="/">Inicia sesión</Link>)}
                    </>
                )}
            </div>
        </>
    )
}

export default NuevoPass