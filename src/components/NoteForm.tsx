import React, { useState } from 'react'

interface Props {
  handleSubmit: (title: string, body: string) => void
}

const NoteForm: React.FC<Props> = ({ handleSubmit }) => {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value)
  }

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSubmit(title, body)
      }}
      className='flex flex-col gap-4 p-4'>
      <div className='relative'>
        <input
          className='w-full rounded-md bg-slate-200 p-4 ring-2 placeholder:text-slate-500 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-500'
          type='text'
          placeholder='insert note&#39;s title'
          value={title}
          onChange={handleTitleChange}
          maxLength={40}
          required
        />
        <label
          className={
            'absolute right-4 bottom-1/2 translate-y-1/2 text-sm text-slate-500 ' +
            (40 - title.length < 0 ? 'text-red-500' : '')
          }>
          {40 - title.length}
        </label>
      </div>
      <input
        className='rounded-md bg-slate-200 p-4 ring-2 placeholder:text-slate-500 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-500'
        type='text'
        placeholder='insert note&#39;s body'
        value={body}
        onChange={handleBodyChange}
        required
      />
      <button
        className='self-end rounded-md bg-green-300 px-4 py-2 font-bold text-green-700 transition hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 active:shadow-none'
        type='submit'>
        Add +
      </button>
    </form>
  )
}

export default NoteForm
