import router from 'next/router'
import React, { useEffect, useState } from 'react'

import { UserResponse } from '../../types/userResponse'
import { SideNav } from '@/components/SideNav'

const Dashboard = () => {
  const [userData, setUserData] = useState<UserResponse | null>(null) // Inicializar userData con un objeto vacío y la propiedad accounts como un arreglo
  const userId = window.localStorage.getItem('userId')

  useEffect(() => {
    if (userId === null) {
      ;<div>Debes iniciar sesion</div>
      router.push(`/login`)
    } else {
      const fetchData = async () => {
        try {
          // eslint-disable-next-line prettier/prettier
        const response = await fetch(`http://localhost:8080/user/${userId}`, {
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
    }
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <SideNav {...userData} />
    </>
  )
}

export default Dashboard
