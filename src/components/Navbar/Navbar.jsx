import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import rocket from '../../assets/rocket.png'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'
import LinkWithIcon from './LinkWithIcon'
import {NavLink, useNavigate, Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import CartContext from '../../context/CartContext';
import { getSuggestionsAPI } from '../../services/productServices'

const Navbar = () => { 

  const user = useContext(UserContext)
  const {cart} = useContext(CartContext)
  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [selectedItem, setSelectedItem] = useState(-1)
  const navigate = useNavigate()



  const handleSubmit = (e)=>{
    e.preventDefault()
    if(search.trim() !==""){
      navigate(`/products?search=${search.trim()}`)
    }
    setSuggestions([])
  }

  useEffect(()=>{
    const delaySuggestions = setTimeout(() => {
      if(search.trim() !== ""){
        getSuggestionsAPI(search)
            .then(res=> setSuggestions(res.data))
            .catch(err => console.log(err))     
      }
      else{
        setSuggestions([])
      }
    }, 400)

    return () => clearTimeout(delaySuggestions)
  },[search])


const handleKeyDown = e => {
  if(selectedItem < suggestions.length){
    if(e.key === "ArrowDown"){
      setSelectedItem(current => current === suggestions.length-1? 0: current + 1 )         
    }
    if(e.key === "ArrowUp"){
      setSelectedItem(current => current === 0 ? suggestions.length-1 : current - 1 )         
    }
    else if(e.key === "Enter" && selectedItem > -1){
      const suggestion = suggestions[selectedItem]
      navigate(`/products?search=${suggestion.title}`)
      setSearch("")
      setSuggestions([])
    }
  }
  else{
    setSelectedItem(-1)
  }
}

  return (
    <nav className='navbar align_center'>
      <div className='align_center'>
            <h1 className='navbar_heading'>3 Wishes</h1>
            <form className='navbar_form align_center' onSubmit={handleSubmit}>

                <input type="text" className='navbar_search' placeholder='Search products'
                    value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={handleKeyDown}/>

                <button type='submit' className='search_button'>Search</button>

              {suggestions.length > 0 && 
                <u className="search_result">
                  {suggestions.map((suggestion, index) =>
                     <li className={selectedItem === index ? "search_suggestion_link active" : "search_suggestion_link"} key={suggestion._id}>
                        <Link to={`/products?search=${suggestion.title}`} 
                            onClick={()=>{
                                            setSearch("");  
                                            setSuggestions([])
                          }}>
                          {suggestion.title}
                          </Link>
                     </li>
                    
                  )}

                </u>
              }
            </form>
      </div>

      <div className='navbar_links align_center'>
            <LinkWithIcon title='Home' link='/' emoji={rocket}/>
            <LinkWithIcon title='Products' link='/products' emoji={star}/>

            {!user &&
            <>
              <LinkWithIcon title='LogIn' link='/login' emoji={idButton}/>
              <LinkWithIcon title='SignUp' link='/signup' emoji={memo}/>
            </>
            }
            
            {user &&
            <>
              <LinkWithIcon title='My Orders' link='/myorders' emoji={order}/>
              <LinkWithIcon title='Logout' link='/logout' emoji={lock}/>    

              <NavLink to="/cart"className='align_center'>
                  Cart{" "}
                  <p className="cart_counts align_center">{cart.length}</p>
              </NavLink>  
              </>
            }

      </div>
    </nav>
  )
}

export default Navbar
