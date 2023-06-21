import { useRouter } from 'next/router'
import React from 'react'

const TodoDetailPage = () => {
  const router = useRouter()

  return <div>Todo Detail {router.query.id}</div>
}

export default TodoDetailPage
