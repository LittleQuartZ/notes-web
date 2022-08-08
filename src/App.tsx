import { useState } from 'react'
import NoteForm from './components/NoteForm'
import NotesList from './components/NotesList'
import { NoteModel } from './model/Note'

const App: React.FC = () => {
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
      archived: false,
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
      <nav>
        <h1 className='bg-slate-300 p-4 text-2xl font-bold'>Notes</h1>
      </nav>
      <NoteForm handleSubmit={handleSubmit} />
      <NotesList
        notes={notes}
        handleDelete={handleDelete}
        handleArchive={handleArchive}
        className='p-4'
      />
    </div>
  )
}

export default App
