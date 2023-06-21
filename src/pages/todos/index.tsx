import Head from 'next/head'

import { useFindTodosQuery } from '@/store/api/todoApi'
import { TodoCardComponent } from '@/components/TodoCardComponent'

const TodosPage = () => {
  const { data: results, isError } = useFindTodosQuery()

  return (
    <section>
      <Head>
        <title>Todos</title>
      </Head>
      <h1>Todos Page</h1>
      <main>
        {results &&
          results.data.map((todo, index) => (
            <TodoCardComponent key={index} todo={todo} />
          ))}
        {isError && <span>some error has happened</span>}
      </main>
    </section>
  )
}

export default TodosPage
