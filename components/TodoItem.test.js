import { render, screen } from '@testing-library/react'
import TodoItem from './TodoItem'

test('TODO の文字が表示される', () => {
  const todo = { id: '1', text: '牛乳を買う', done: false }
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />)
  expect(screen.getByText('牛乳を買う')).toBeInTheDocument()
})

test('未完了ならチェックボックスはオフ', () => {
  const todo = { id: '1', text: '牛乳を買う', done: false }
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />)
  const checkbox = screen.getByRole('checkbox', { name: '牛乳を買う' })
  expect(checkbox).not.toBeChecked()
})

test('削除ボタンに TODO 名入りのラベルが付いている', () => {
  const todo = { id: '1', text: '牛乳を買う', done: false }
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />)
  expect(screen.getByRole('button', { name: '牛乳を買うを削除' })).toBeInTheDocument()
})

test('完了済みならチェックがオンで、打ち消し線が付く', () => {
  const todo = { id: '1', text: '牛乳を買う', done: true }
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />)
  expect(screen.getByRole('checkbox', { name: '牛乳を買う' })).toBeChecked()
  expect(screen.getByText('牛乳を買う')).toHaveStyle({ textDecoration: 'line-through' })
})

test('未完了なら打ち消し線は付かない', () => {
  const todo = { id: '1', text: '牛乳を買う', done: false }
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />)
  expect(screen.getByText('牛乳を買う')).toHaveStyle({ textDecoration: 'none' })
})

test('進捗スライダーが表示され、操作できる', () => {
  const handleProgressChange = jest.fn()
  const todo = { id: '1', text: '牛乳を買う', done: false, progress: 40 }
  render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} onProgressChange={handleProgressChange} />)

  const slider = screen.getByRole('slider', { name: '牛乳を買うの進捗' })
  expect(slider).toBeInTheDocument()
  expect(slider).toHaveValue('40')
  expect(screen.getByText('40%')).toBeInTheDocument()
})
