import clientAxios from '../config/axios';
import { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState('');

  const params = useParams();
  const { id } = params;

  useEffect(() => {

    const confirmarCuenta = async () => {

      try {

        const url = `/veterinarios/confirmar/${id}`;
        const {data} = await clientAxios(url); //axios() por defecto utiliza get
        
        setCuentaConfirmada(true);
        setAlerta({msg: data.msg, error: false});

      } catch (error) {
        
        setAlerta({msg: error.response.data.msg, error: true});
      }

      setCargando(false);
    }

    confirmarCuenta();

  }, []); //Se le pone un arreglo vacio para que se ejecute una vez cuando este listo el componente

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Confirma tu cuenta y comienza a administrar tus
            <span className="text-black"> pacientes</span>
          </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {!cargando && <Alerta alerta={alerta}/>}
            {cuentaConfirmada && <Link className="block text-center my-5 text-gray-500" to="/">Iniciar sesión</Link>}
        </div>
    </>
  )
}

export default ConfirmarCuenta