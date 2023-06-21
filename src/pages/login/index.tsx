import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Link from 'next/link'


const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      // Enviar los datos de inicio de sesión al backend
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      })

      // Verificar la respuesta del backend
      if (response.ok) {
        const data = await response.json()
        const userId = data.id
        const userIdLong = Number(userId)

        console.log('Hola ')

        // eslint-disable-next-line prettier/prettier
        router.push("/dashboard?userId=${userIdLong}")
        // Realizar la redirección después de la autenticación exitosa
      } else {
        const errorData = await response.json()
        // Manejar el error de autenticación
        console.error(errorData)
      }
    } catch (error) {
      // Manejar cualquier error de red u otros errores
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/CSS/normalize.css" />
        <link rel="stylesheet" href="/CSS/StyleLogin.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/img/face.png" type="image/x-icon" />
        <title>LookPay</title>
      </Head>

      <nav className={styles.mainNav}>
        <a>
          <img className="mainNav__img" src="/img/face.png" alt="logo" />
        </a>
        <a className="mainNav__option" href="nosotros.html">
          Sobre Nosotros
        </a>
      </nav>

      <main className="contenedor">
        <div className="login sombra">
          <div className="login__Apart login__Apart--transformar">
            <img src="/img/lookPay.png" alt="" />
          </div>

          <div className="login__Bpart">
            <h1>Bienvenido!</h1>

            <form className="form">
              <p className="form__txt userText">Correo electrónico:</p>
              <input
                className="form__input userType"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <p className="form__txt userPsswd">Contraseña:</p>
              <input
                className="form__input psswType"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>

            <div className="form__button">
              <button
                className="form__button--ingresar button login__submit"
                type="button"
                onClick={handleLogin}
              >
                Ingresar
              </button>

              <Link href="registro.html">
                <a className="form__button--crear">Crear una cuenta</a>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <Link href="principalAdmin.html">
          <a>
            <p>Vista admin</p>
          </a>
        </Link>
        <Link href="principalEmpresa">
          <a>
            <p>Vista empresa</p>
          </a>
        </Link>
      </footer>
    </>
  )
}

export default Login
