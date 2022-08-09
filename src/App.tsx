import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import NoteForm from './components/NoteForm'
import NotesList from './components/NotesList'
import { NoteModel } from './model/Note'

const App: React.FC = () => {
  const location = useLocation()
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [search, setSearch] = useState('')

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

  useEffect(() => {
    const response = localStorage.getItem('notes')
    if (response) {
      const savedNotes = JSON.parse(response) as NoteModel[]
      savedNotes.map((note) => {
        note.createdAt = new Date(note.createdAt)
        return note
      })
      setNotes(savedNotes)
    } else {
      localStorage.setItem('notes', JSON.stringify(notes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <div className='bg-zinc-10 font-inter'>
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
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className='my-2 block w-full bg-slate-300 p-4 text-lg placeholder:text-slate-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-700'
        placeholder={
          (location.pathname === '/' ? 'Notes.' : 'Archived Notes.') +
          ' Click here to search'
        }
      />
      <Routes>
        <Route
          path='/'
          element={
            <NotesList
              notes={
                search
                  ? notes.filter(
                      (note) =>
                        !note.archived &&
                        (note.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                          note.body
                            .toLowerCase()
                            .includes(search.toLowerCase()))
                    )
                  : notes.filter((note) => !note.archived)
              }
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
              notes={
                search
                  ? notes.filter(
                      (note) =>
                        note.archived &&
                        (note.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                          note.body
                            .toLowerCase()
                            .includes(search.toLowerCase()))
                    )
                  : notes.filter((note) => note.archived)
              }
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
