import TicketForm from '@/app/(components)/TicketForm'
import React from 'react'

const TicketPage = async ({params}) => {

  const EDITMODE = params.id === 'new' ? false : true
  let updateTicketData = {}

  return (
    <div>
      <TicketForm />
    </div>
  )
}

export default TicketPage