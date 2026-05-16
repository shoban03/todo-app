'use client'

import { useState } from 'react'

const LABELS = ['Work', 'Personal', 'Urgent']

const LABEL_COLORS = {
  Work: 'bg-blue-100 text-blue-600',
  Personal: 'bg-green-100 text-green-600',
  Urgent: 'bg-red-100 text-red-600',
}

export default function Home() {
  const [input, setInput] = useState('')
  const [label, setLabel] = useState('Personal')
  const [dueDate, setDueDate] = useState('')
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('All')
  
  const [showDate, setShowDate] = useState(false)
  const [showLabel, setShowLabel] = useState(false)

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), title: input, done: false, label, dueDate }])
    setInput('')
    setDueDate('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const isOverdue = (todo) => {
    if (!todo.dueDate || todo.done) return false
    return new Date(todo.dueDate) < new Date()
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">ToDo List</h1>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-4">
          {['All', ...LABELS].map(l => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filter === l
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {l}
            </button>
          ))}
        </div>

        {/* Quick add row */}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a todo..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => setShowDate(!showDate)}
            title="Set due date"
            className={`px-3 py-2 rounded-lg text-sm border ${showDate ? 'bg-gray-100 border-gray-300' : 'border-gray-300 text-gray-400 hover:text-gray-600'
              }`}>
            📅
          </button>
          <button
            onClick={() => setShowLabel(!showLabel)}
            title="Set label"
            className={`px-3 py-2 rounded-lg text-sm border ${showLabel ? 'bg-gray-100 border-gray-300' : 'border-gray-300 text-gray-400 hover:text-gray-600'
              }`}>
            🏷️
          </button>
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
            Add
          </button>
        </div>

        {(showDate || showLabel) && (
          <div className="flex gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
            {showDate && (
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Due date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
                />
              </div>
            )}
            {showLabel && (
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Label</label>
                <select
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600">
                  {LABELS.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Todo list */}
        <ul className="space-y-2">
          {todos
            .filter(todo => filter === 'All' || todo.label === filter)
            .map(todo => (
              <li key={todo.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className={todo.done ? 'line-through text-gray-400 flex-1' : 'flex-1'}>
                  {todo.title}
                </span>
                {todo.label && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LABEL_COLORS[todo.label]}`}>
                    {todo.label}
                  </span>
                )}
                {todo.dueDate && (
                  <span className={`text-xs ${isOverdue(todo) ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                    📅 {todo.dueDate}
                  </span>
                )}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-600 text-xs">
                  ✕
                </button>
              </li>
            ))}
        </ul>

      </div>
    </main>
  )
}