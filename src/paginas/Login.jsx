import {Link, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {useState} from 'react';
import Alerta from '../components/Alerta';
import clientAxios from '../config/axios';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(email == '' || password == ''){

      setAlerta({msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    try {

      const url = '/veterinarios/login';
      const {data} = await clientAxios.post(url, {email, password});

      setAlerta({msg: data.msg, error: false});
      localStorage.setItem('token', data.token);
      setAuth(data);

      navigate('/admin');
      
    } catch (error) {
      
      setAlerta({msg: error.response.data.msg, error: true});
    }

  }


  const {msg} = alerta;

  return (
    
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia sesión y administra tus 
          <span className="text-black"> pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg && <Alerta 
              alerta={alerta}
          />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input type="email" placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input type="password" placeholder="Tu password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={password} onChange={e => setPass(e.target.value)}/>
          </div>
          <input type="submit" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover: cursor-pointer hover:bg-indigo-800 md:w-auto" value="Iniciar sesión"/>
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta resgistrate?</Link>
          <Link className="block text-center my-5 text-gray-500" to="/recuperar">Olvide mi contraseña</Link>
        </nav>
      </div>
        
        
    </>
  )
}

export default Login