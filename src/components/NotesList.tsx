import { NoteModel } from '../model/Note'
import Note from './Note'

interface Props {
  className?: string | undefined
  notes: NoteModel[]
  handleArchive: (id: number) => void
  handleDelete: (id: number) => void
}

const NotesList: React.FC<Props> = ({
  className,
  notes,
  handleDelete,
  handleArchive,
}) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {notes.length > 0 ? (
        notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleDelete={handleDelete}
            handleArchive={handleArchive}
          />
        ))
      ) : (
        <h2 className='text-center text-2xl opacity-50'>No notes found. 🙁</h2>
      )}
    </div>
  )
}

export default NotesList
