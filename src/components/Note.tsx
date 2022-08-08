import React from 'react'
import { NoteModel } from '../model/Note'
import NoteButton from './NoteButton'

interface Props {
  note: NoteModel
  handleArchive: (id: number) => void
  handleDelete: (id: number) => void
}

const Note: React.FC<Props> = ({ note, handleArchive, handleDelete }) => {
  const { id, title, body, createdAt, archived } = note

  return (
    <article className='group flex flex-col overflow-hidden rounded-md bg-slate-100 shadow'>
      <header className='bg-slate-300 p-4'>
        <h1 className='overflow-hidden text-ellipsis text-xl font-bold'>
          {title}
        </h1>
      </header>
      <section className='p-4'>
        <p className='text-ellipsis text-slate-900'>{body}</p>
        <span className='text-sm text-slate-500'>
          {createdAt.toLocaleString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </section>
      <section className='flex items-center'>
        <NoteButton
          handleClick={() => handleArchive(id)}
          children={archived ? 'Unarchive' : 'Archive'}
          className='peer bg-amber-100 text-amber-500 hover:border-amber-300 focus:border-amber-300'
        />
        <NoteButton
          handleClick={() => handleDelete(id)}
          children='Delete'
          className='border-l-2 bg-red-100 text-red-500 hover:border-red-300 focus:border-red-300 peer-hover:border-l-amber-300 peer-focus:border-l-amber-300'
        />
      </section>
    </article>
  )
}

export default Note
