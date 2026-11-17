export function countRemaining(todos) {
  return todos.filter((todo) => !todo.done).length
}

export function isValidTodoText(text) {
  const trimmed = text.trim()
  return trimmed.length > 0 && trimmed.length <= 50
}
export function countDone(todos) {
  return todos.filter((todo) => todo.done).length
}

export function createTodo(text) {
  return { id: crypto.randomUUID(), text, done: false, progress: 0 }
}

export function addTodo(todos, text) {
  return [...todos, createTodo(text)]
}

export function toggleTodo(todos, id) {
  return todos.map((todo) => {
    if (todo.id !== id) return todo
    const nextDone = !todo.done
    return {
      ...todo,
      done: nextDone,
      progress: nextDone ? 100 : (todo.progress === 100 ? 0 : (todo.progress ?? 0)),
    }
  })
}

export function updateProgress(todos, id, progress) {
  const value = Math.min(100, Math.max(0, Number(progress) || 0))
  return todos.map((todo) => {
    if (todo.id !== id) return todo
    return {
      ...todo,
      progress: value,
      done: value === 100,
    }
  })
}

export function deleteTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id)
}

export function filterTodos(todos, filter) {
  if (filter === 'active') return todos.filter((todo) => !todo.done)
  if (filter === 'done') return todos.filter((todo) => todo.done)
  return todos
}

export function clearDone(todos) {
  return todos.filter((todo) => !todo.done)
}

export function editTodo(todos, id, text) {
  const trimmed = text.trim()
  if (trimmed === '') return todos
  return todos.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
}

export function sortTodos(todos, order) {
  if (order === 'undone-first') return todos.toSorted((a, b) => Number(a.done) - Number(b.done))
  return todos
}
