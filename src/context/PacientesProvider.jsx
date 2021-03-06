import { createContext, useState, useEffect } from "react";
import clientAxios from '../config/axios';

const PacienteContext = createContext();

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {

        const obtenerPacientes = async () => {

            try {
                
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {

                    headers: {
    
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }

                const {data} = await clientAxios('/pacientes', config);

                setPacientes(data);

            } catch (error) {
                
                console.log(error);
            }

        }

        obtenerPacientes();

    }, []);

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
    
            headers: {
    
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }

        if(paciente.id){

            try {
                
                const {data} = await clientAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);

                setPacientes(pacienteActualizado);

            } catch (error) {
                
                console.log(error);
            }

        }else{

            try {
    
                const {data} = await clientAxios.post('/pacientes', paciente, config);
                const { createdAt, __v, updatedAt, ...pacienteAlmacenado} = data;
                
                setPacientes([pacienteAlmacenado, ...pacientes]);
                
            } catch (error) {
                
                console.log(error.response.data.msg);
            }
            
        }

        
    }

    const setEdicion = (paciente) => {


        setPaciente(paciente);
    }

    const eliminarPaciente = async (id) => {

        const confirmar = confirm('Deseas borrar el registro?');
        
        if(confirmar){

            try{

                const token = localStorage.getItem('token');
                const config = {
            
                    headers: {
            
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }

                const { data } = await clientAxios.delete(`/pacientes/${id}`, config);
                const pacienteActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);

                setPacientes(pacienteActualizado);

            }catch(error){

                console.log(error);
            }
        }
    }

    return (

        <PacienteContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente, 
            eliminarPaciente
        }}>

            {children}

        </PacienteContext.Provider>
    )
}

export {PacientesProvider}

export default PacienteContext;