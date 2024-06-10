'use client';

import React, { useState } from 'react'

const handleOnChange = (e) =>{
    const value = e.target.value
    const name = e.target.name

    setFormData((preState) =>({
        ...preState,
        [name]: value
    }))
}

const TicketForm = () => {
    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hardware Problem"
    }

    const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className='flex justify-center'>
        <form>
            <h3>Create Your Ticket</h3>
            <label>Title</label>
            <input 
                id="title" 
                name='title'
                type='text'
                onChange={handleOnChange}
                required={true}
                value={formData.title}
            />
        </form>
    </div>
  )
}

export default TicketForm