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
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleDelete={handleDelete}
          handleArchive={handleArchive}
        />
      ))}
    </div>
  )
}

export default NotesList
