import { useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import NoteForm from './components/NoteForm'
import NotesList from './components/NotesList'
import { NoteModel } from './model/Note'

const App: React.FC = () => {
  const location = useLocation()
  const [notes, setNotes] = useState<NoteModel[]>([
    {
      id: 1,
      title: 'Typescript',
      body: 'Typescript is a typed superset of JavaScript that compiles to plain JavaScript. In Typescript you can use data types',
      createdAt: new Date(),
      archived: false,
    },
    {
      id: 2,
      title: 'Typescriptaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      body: 'Typescript is a typed superset of JavaScript that compiles to plain JavaScript. In Typescript you can use data types',
      createdAt: new Date(),
      archived: true,
    },
  ])

  const handleArchive = (id: number) => {
    setNotes((notes) =>
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    )
  }

  const handleDelete = (id: number) => {
    setNotes((notes) => notes.filter((note) => note.id !== id))
  }

  const handleSubmit = (title: string, body: string) => {
    const newNote = {
      id: Date.now(),
      title,
      body,
      createdAt: new Date(),
      archived: false,
    }

    setNotes((notes) => [...notes, newNote])
  }

  return (
    <div className='font-inter'>
      <nav className='flex items-center bg-slate-300 p-4'>
        <h1 className='text-2xl font-bold'>Notes</h1>
        {location.pathname === '/' ? (
          <Link
            className='ml-auto rounded-md bg-slate-400 px-4 py-2 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-700'
            to='/archived'>
            Archived
          </Link>
        ) : (
          <Link
            className='ml-auto rounded-md bg-slate-400 px-4 py-2 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-700'
            to='/'>
            Home
          </Link>
        )}
      </nav>
      <NoteForm handleSubmit={handleSubmit} />
      <Routes>
        <Route
          path='/'
          element={
            <NotesList
              notes={notes.filter((note) => !note.archived)}
              handleDelete={handleDelete}
              handleArchive={handleArchive}
              className='p-4'
            />
          }
        />
        <Route
          path='/archived'
          element={
            <NotesList
              notes={notes.filter((note) => note.archived)}
              handleDelete={handleDelete}
              handleArchive={handleArchive}
              className='p-4'
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
