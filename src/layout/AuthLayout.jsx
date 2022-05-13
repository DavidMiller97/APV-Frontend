//En ultimas versiones ya no es necesario importar React
//import React from 'react'
import { Outlet } from "react-router-dom";

const AuthLayout = () => {

  return (
    
    //Se le considera como un Fragment
    <>

        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-12 p-5">
            <Outlet />
        </main>
       
    </>
  )

}

export default AuthLayout