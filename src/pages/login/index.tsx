import React, { useState } from 'react'

import { useRouter } from 'next/router'
import Head from 'next/head'

import Link from 'next/link'

import { InputTextComponent } from '@/components/InputTextComponent'

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
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className=" justify-center mx-auto">
            <div className="place-self-center flex justify-center">
              <img
                className=" w-auto h-7 sm:h-8"
                src="https://merakiui.com/images/logo.svg"
                alt=""
              />
            </div>
            <div>
              <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                MyPos System
              </h3>
              <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                Inicio de sesión
              </p>
            </div>
            <form>
              <div className="w-full mt-4">
                <InputTextComponent
                  id="username"
                  name="username"
                  labelText="Username"
                  placeholder="Username"
                  onChange={() => {}}
                />
              </div>
            </form>

            <div>
              <div className="flex items-center justify-center content-center mt-4">
                <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
