'use client'

import { useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onProgressChange }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const progress = todo.progress ?? (todo.done ? 100 : 0)

  function startEdit() {
    setDraft(todo.text)
    setEditing(true)
  }

  function finishEdit() {
    onEdit(todo.id, draft)
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') finishEdit()
    if (e.key === 'Escape') setEditing(false)
  }

  if (editing) {
    return (
      <li>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={finishEdit}
          onKeyDown={handleKeyDown}
          aria-label={`${todo.text}を編集`}
          autoFocus
        />
      </li>
    )
  }

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span onDoubleClick={startEdit} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
      </label>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={progress}
          onChange={(e) => onProgressChange?.(todo.id, Number(e.target.value))}
          aria-label={`${todo.text}の進捗`}
        />
        <span style={{ fontSize: '0.85em', minWidth: '40px', textAlign: 'right' }}>{progress}%</span>
      </div>
      <button onClick={() => onDelete(todo.id)} aria-label={`${todo.text}を削除`}>
        削除
      </button>
    </li>
  )
}
