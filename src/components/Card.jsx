import React, { useState } from 'react'
import './Card.css'
import Update from './Update';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '../features/userSlice';
import AddTeam from './addTeam';



const Card = ({user}) => {
  
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [isTeam, setIsTeam] = useState(false)

  return ( 
    <>
      {user ? (
        <div className='card' >
          <div className='avatar'>
            <img src={user.avatar || '/blank.webp'} alt={`${user.first_name} ${user.last_name} Avatar`} />
          </div>
          <div className='section'>
          <div className='info'>
            <h3>{user.id}</h3>
            <div className='name'>
              <h2>{user.first_name}</h2>
              <h2>{user.last_name}</h2>
            </div>
            <p>{user.email}</p>
            <p>{user.gender}</p>
            <p>Domain: {user.domain}</p>
            <p>Availability: {String(user.available) || 'N/A'}</p>
          </div>
          <div className='buttons'>
            <button onClick={() => dispatch(deleteUsers(user._id))}><i className="fa-solid fa-trash"></i></button>
            <button onClick={() => setIsOpen(true)}><i className="fa-solid fa-pen"></i></button>
            <button onClick={() => setIsTeam(true)}>Add to Team</button>
            <Update userId={user._id} open={isOpen} onClose={() => setIsOpen(false)} />
            <AddTeam userId={user._id} open={isTeam} onClose={() => setIsTeam(false)}/>
          </div>
          </div>
        </div>
      ) : (
        <div style={{
          width: '100px',
          backgroundColor: 'white',
          margin: '150px auto'
        }}>
          <h1>No Users yet.</h1>
        </div>
      )}
    </>
  );

}

export default Card
