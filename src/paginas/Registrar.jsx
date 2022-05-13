import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clientAxios from "../config/axios";

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passRepeated, setPassRepeated] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {

    e.preventDefault();
    if([nombre, email, password, passRepeated].includes('')){

      setAlerta({msg: 'Hay campos vacios!', error: true});
      return;
    }

    if(password !== passRepeated){

      setAlerta({msg: 'Las contraseñas no son iguales', error: true});
      return;
    }

    if(password.length < 8){

      setAlerta({msg: 'La contraseña es menor a 8 caracteres!', error: true});
      return;
    }

    setAlerta({});
    //Crear el usuario
    try {

      const url = `/veterinarios`;

      await clientAxios.post(url, {nombre, email, password});

      setAlerta({msg:'Creado correctamente, revisa tu email!', error: false});

    } catch (error) {
      
      setAlerta({msg: error.response.data.msg, error: true});
    }

  }

  const {msg} = alerta;

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Crea tu cuenta y Administra tus
            <span className="text-black"> pacientes</span>
          </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

          {msg && <Alerta 
              alerta={alerta}
          />}

          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
              <input 
              type="text" 
              placeholder="Tu nombre" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input 
              type="email" 
              placeholder="Email de registro" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
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
            <input type="submit" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover: cursor-pointer hover:bg-indigo-800 md:w-auto" value="Registrate"/>
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? inicia sesión</Link>
            <Link className="block text-center my-5 text-gray-500" to="/recuperar">Olvide mi contraseña</Link>
          </nav>

        </div>
    </>
  )
}

export default Registrar