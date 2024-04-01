
import { useEffect, useState } from 'react'
import './App.css'
import Modal from './components/Modal'
import Card from './components/Card'
import { useDispatch, useSelector } from 'react-redux'
import {  filterUsers, searchUser, showUsers } from './features/userSlice'
import {Toaster} from 'react-hot-toast'
import Team from './components/Team'

function App() {
  const dispatch = useDispatch()
  const {users, error} = useSelector((state) => state.user)
  const [isOpen, setIsOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false)
  const [filter, setFilter] = useState(false)
  const [search, setSearch] = useState('')
  const [searchbar, setSearchBar] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [domain, setDomain] = useState('')
  const [availability, setAvailable] = useState('')
  const [gender, setGender] = useState('')



  useEffect(() => {
    dispatch(showUsers(currentPage))
  }, [currentPage, dispatch]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className='main'>
      <Toaster 
           position={window.innerWidth < 768 ? 'bottom-center' : 'top-center'}
          toastOptions={{duration: 5000}} />
      <Modal open={isOpen} onClose={() => setIsOpen(false)} />
     
      <button className='revert-button' onClick={() => dispatch(showUsers(currentPage))}>REVERT</button>
      <button className='filter-button' onClick={() => setFilter(true)}><h5>FILTERS</h5></button>
      <div style={{display: filter ? 'flex': 'none'}} className='filters'>
      <button className='close' onClick={() => setFilter(false)}>close</button>
      <h1>Filters:</h1>
      <label htmlFor='domain'>Domain</label>
      <input id='domain' name='domain' value={domain} onChange={(e) => setDomain(e.target.value)}/>
      <label htmlFor='availability'>Availability</label>
       <input id='availability' name='availability' value={availability} onChange={(e) => setAvailable(e.target.value)}/>
        <label htmlFor='gender'>Enter Gender:</label>
        <input type='text' id='gender' name='gender' value={gender} onChange={(e) => setGender(e.target.value)}/>
        <button style={{marginTop: '10px'}} onClick={() => dispatch(filterUsers({domain, availability, gender}))}>OK</button>
      </div>
      <div className='cards'>
      <div className='user-controls'>
    <button className='add' onClick={() => setIsOpen(true)}>Add User +</button>
      <button className='team' onClick={() => setTeamOpen(true)}>Team</button>
      <button className='search' onClick={() => setSearchBar(true)}>Search</button>
      <div style={{display: searchbar ? 'flex': 'none'}} className='searchbar'>
      <button onClick={() => setSearchBar(false)}>close</button>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Enter input..'></input>
        <button onClick={() => dispatch(searchUser(search))}>GO</button>
      </div>
      <Team open={teamOpen} onClose={() => setTeamOpen(false)}/>
    </div>
        {users.length > 0 || error ? (users.map((user) => (
          <Card key={user.id} user={user} />
        ))) : (  <div
    style={{
      width: '100px',
      backgroundColor: 'white',
      margin: '150px auto',
    }}
  >
    <h1>No Users yet.</h1>
  </div>)}
      </div>
  
      {/* Pagination controls */}
      <div className='controls'>
        <button onClick={handlePrevPage}>
          Previous Page
        </button>
        <span>{currentPage}</span>
       <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default App
