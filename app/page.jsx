import React from 'react'
import TicketCard from './(components)/TicketCard'


const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets",{
      cache: 'no-store',
    });
    if(!res.ok){
      throw new Error("Failed to fetch topics")
    }

    return res.json()

  } catch (error) {
    console.log("Failed to get tocket", error)
  }
}

const Dashboard = async () => {

  const data = await getTickets()

  if(!data?.ticket){
    return <p>No Tickets</p>
  }

  const tickets = data.ticket

  const uniqueCategories = [
    ...new Set(tickets?.map(({category}) => category))
  ]
  return (
    <div className='p-5'>
      <div>
        {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div className='mb-4' key={categoryIndex}>
            <h2>{uniqueCategory}</h2>
            <div className='lg:grid grid-col-2 xl:grid-cols-4'>
              {tickets.filter((ticket) => ticket.category === uniqueCategory).map((filteredTicket, _index) => (
                <TicketCard id={_index} key={_index} ticket={filteredTicket}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard