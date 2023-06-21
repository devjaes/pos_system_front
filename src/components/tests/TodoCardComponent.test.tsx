import { render } from '@testing-library/react'

import { TodoCardComponent } from '../TodoCardComponent'

const testTodo = { description: 'todo description', id: '1' }

describe('TodoCardComponent tests', () => {
  it('should show a title', () => {
    const screen = render(<TodoCardComponent todo={testTodo} />)

    expect(screen.getByText('todo description')).toBeInTheDocument()
  })
})
