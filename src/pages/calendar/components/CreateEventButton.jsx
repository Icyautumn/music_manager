import React, { useContext } from 'react'
import plus from '../assets/plus.svg'
import { Button } from '@material-ui/core'
import GlobalContext from '../context/GlobalContext'
export default function CreateEventButton() {
  const {setShowEventModal} = useContext(GlobalContext)
  return (
    <button onClick={()=> setShowEventModal(true)} className='border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl border'>
        <img src={plus} alt="create_event" className='w-7  h-7'/>
        <span className='pl-3 pr-7'>Create Event</span>
    </button>
  )
}
