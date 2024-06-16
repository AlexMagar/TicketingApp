'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


const TicketForm = ({ticket}) => {

    const router = useRouter()

    const EDITMODE = ticket._id === 'new' ? false : true

    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hardware Problem"
    }

    if(EDITMODE){
        startingTicketData['title'] = ticket.title
        startingTicketData['description'] = ticket.description
        startingTicketData['priority'] = ticket.priority
        startingTicketData['progress'] = ticket.progress
        startingTicketData['status'] = ticket.status
        startingTicketData['category'] = ticket.category

    }

const [formData, setFormData] = useState(startingTicketData);

const handleOnChange = (e) =>{
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name

    setFormData((preState) =>({
        ...preState,
        [name]: value
    }))
}

const handleOnSubmit = async (e) => {
    e.preventDefault()

    if(EDITMODE){
        const res = await fetch(`/api/Tickets/${ticket._id}`, {
            method: 'PUT',
            body: JSON.stringify({formData}),
            "content-type": "application/json"
        })
        if(!res.ok){
            throw new Error("Failed to update Ticket...")
        }
    }else{
        const res = await fetch("/api/Tickets", {
            method: 'POST',
            body: JSON.stringify({formData}),
            "content-type": "application/json"
        })
        if(!res.ok){
            throw new Error("Failed to create Ticket...")
        }
    }
    
    router.refresh()
    router.push('/')
}

  return (
    <div className='grid grid-cols-1 sm-grid-col-1 p-1'>
        <form className='flex flex-col gap-3 ' method='post' onSubmit={handleOnSubmit}>
            <h3>
                {
                    EDITMODE ? 'Update your Ticket' : 'Create your Ticket'
                }
            </h3>
            <label>Title</label>
            <input 
                id="title" 
                name='title'
                type='text'
                onChange={handleOnChange}
                required={true}
                value={formData.title}
            />
            <label>Descriptions</label>
            <textarea 
                id="description" 
                name='description'
                onChange={handleOnChange}
                required={true}
                value={formData.description}
                rows='5'
            />
            <label>Caregory</label>
            <select 
                name='category'
                value={formData.category}
                onChange={handleOnChange}
            >
                <option value='Hardware Problem'>Hardware Problem</option>
                <option value='Software Problem'>Software Problem</option>
                <option value='Project'>Project</option>
            </select>
            <label>Priority</label>
            <div>
                <input 
                    id='priority-1' 
                    name='priority' 
                    type='radio' 
                    onChange={handleOnChange} 
                    value={1} 
                    checked={formData.priority == 1}
                />
                <label>1</label>
                <input 
                    id='priority-2' 
                    name='priority' 
                    type='radio' 
                    onChange={handleOnChange} 
                    value={2} 
                    checked={formData.priority == 2}
                />
                <label>2</label>
                <input 
                    id='priority-3' 
                    name='priority' 
                    type='radio' 
                    onChange={handleOnChange} 
                    value={3} 
                    checked={formData.priority == 3}
                />
                <label>3</label>
                <input 
                    id='priority-4' 
                    name='priority' 
                    type='radio' 
                    onChange={handleOnChange} 
                    value={4} 
                    checked={formData.priority == 4}
                />
                <label>4</label>
                <input 
                    id='priority-5' 
                    name='priority' 
                    type='radio' 
                    onChange={handleOnChange} 
                    value={5} 
                    checked={formData.priority == 5}
                />
                <label>5</label>
            </div>
            <label>Progress</label>
            <input 
                type='range' 
                id='progress' 
                name='progress' 
                value={formData.progress}
                min='0'
                max='100'
                onChange={handleOnChange}
            />
            <label>Status</label>
            <select name='status' value={formData.status} onChange={handleOnChange}>
                <option value='not started'>Not Started</option>
                <option value='Started'>Started</option>
                <option value='done'>Done</option>
            </select>
            <input 
                type='submit' 
                className='btn' 
                value={EDITMODE ? 'Update your Ticket' : 'Create your Ticket'}/>
        </form>
    </div>
  )
}

export default TicketForm