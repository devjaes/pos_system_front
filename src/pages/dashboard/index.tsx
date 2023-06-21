import router from 'next/router'
import React, { useEffect, useState } from 'react'

import { UserResponse } from '../../types/userResponse'

const Dashboard = () => {
  const [userData, setUserData] = useState<UserResponse | null>(null) // Inicializar userData con un objeto vacío y la propiedad accounts como un arreglo
  const { userId } = router.query
  const userIdLong = Number(userId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line prettier/prettier
        const response = await fetch("http://localhost:8080/user/8", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUserData(data.user)
        } else {
          const errorData = await response.json()
          console.error(errorData)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <nav className="mainNav">
        <a href="principalUsuario.html">
          <img className="mainNav__img" src="img/face.png" alt="logo" />
        </a>
        <div className="optionsNav">
          <a className="mainNav__option" href="cuentasUsuario.html">
            Mis cuentas
          </a>
          <a className="mainNav__option" href="perfilUsuario.html">
            Perfil {userData.name}
          </a>
          <a className="mainNav__option" href="index.html">
            Cerrar sesión
          </a>
        </div>
      </nav>

      <div className="top">
        <h2 className="top__contenido">Tus transacciones más seguras</h2>
      </div>

      <main className="contenedor">
        <h1>Tus cuentas</h1>
      </main>
    </>
  )
}

export default Dashboard
