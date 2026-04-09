import React from 'react'
import { formatDate } from '../helpers/formatDate'

export const Message = ({ message, date, email }) => {

  return (
    <div className='card'>
      <p>{message}</p>
      <span>{formatDate(date)}</span>
      <span className='user-email'>{email}</span>
    </div>
  )
}
