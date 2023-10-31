import React from 'react'
import './LinkWithIcon.css'
import {NavLink} from 'react-router-dom'

const LinkWithIcon = ({title, link, emoji, sidebar }) => {
  return (
   
    <NavLink className={sidebar ? 'align_center sidebar_link' : 'align_center'} to={link}>
        {title} 
        <img src={emoji} alt="emoji" className='link_emoji'/>
    </NavLink>

  )
}

export default LinkWithIcon
