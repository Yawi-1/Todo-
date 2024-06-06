import React from 'react'
import Todo from './Components/TodoApp/Todo'
import TodoProvider from './Context/TodoProvider'
const App = () => {
  return (
    <TodoProvider>
      <Todo/>
    </TodoProvider>
  )
}

export default App
