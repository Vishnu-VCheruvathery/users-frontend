import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import {  updateUsers } from '../features/userSlice';


const MODAL_STYLES = {
    position: "fixed",
    display: 'flex',
    gap: '2px',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
    border: '1px solid gray',
    borderRadius: '0.5em'
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

    



const Update = ({open, onClose, userId}) => {
    const dispatch = useDispatch()
    const [id, setID] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [avatar, setAvatar] = useState('')
    const [domain, setDomain] = useState('')
    const [available, setAvailable] = useState('')


    const handleSubmit = (e) => {
      e.preventDefault()
      if(id&&first&&last&&email&&gender&&avatar&&domain&&available){
        dispatch(updateUsers({ userId, id, first, last, email, gender, avatar, domain, available}))
      }
      
     }


    if(!open) return null
    return createPortal(
    <>
     <div style={OVERLAY_STYLE} />
      <div style={MODAL_STYLES}>
      <button onClick={onClose}>X</button>
      <form onSubmit={handleSubmit}>
      <label htmlFor='id'>Enter ID</label>
      <input 
      placeholder='id'
      id='id'
      value={id}
      onChange={(e) => setID(e.target.value)}
      required></input>
 
      <label htmlFor='first'>Enter First Name</label>
      <input 
      placeholder='FirstName'
      value={first}
      id='first'
      required
      onChange={(e) => setFirst(e.target.value)}
      ></input>
     
      <label htmlFor='last'>Enter Last Name</label>
      <input 
      placeholder='LastName'
      id='last'
      value={last}
      required
      onChange={(e) => setLast(e.target.value)}
      ></input>
   
       <label htmlFor='email'>Enter Email</label>
      <input 
      placeholder='email'
      id='email'
      value={email}
      required
      onChange={(e) => setEmail(e.target.value)}
      ></input>
    
       <label htmlFor='gender'>Enter Gender</label>
      <input 
      placeholder='gender'
      id='gender'
      value={gender}
      required
      onChange={(e) => setGender(e.target.value)}
      ></input>
     
      <label htmlFor='url'>Insert Avatar</label>
      <input 
      placeholder='url'
      id='url'
      value={avatar}
      required
      onChange={(e) => setAvatar(e.target.value)}
      ></input>
  
      <label htmlFor='domain'>Enter Domain</label>
      <input 
      placeholder='domain'
      id='domain'
      value={domain}
      required
      onChange={(e) => setDomain(e.target.value)}
      ></input>
   
      <label htmlFor='available'>Enter Availability</label>
      <input 
      placeholder='available'
      id='available'
      value={available}
      required
      onChange={(e) => setAvailable(e.target.value)}
      ></input>
      
      <button>Submit</button>
      </form>
      </div>
    </>,
    document.getElementById('portal')
  )
  
}

export default Update
