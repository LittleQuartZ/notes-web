import React from 'react'

interface Props {
  handleClick: () => void
  className?: string | undefined
  children?: React.ReactNode
}

const NoteButton: React.FC<Props> = ({ children, handleClick, className }) => {
  return (
    <button
      onClick={handleClick}
      className={`${className} flex-1 border-t-2 border-slate-300 p-2 focus:outline-none`}>
      {children}
    </button>
  )
}

export default NoteButton
