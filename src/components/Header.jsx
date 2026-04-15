import React, { useEffect, useState } from 'react'
import Arrow from './icons/Arrow'
import Dots from './icons/Dots'
import { supabase } from '../supabaseClient';

export const Header = () => {

  const[user, setUser] = useState('mike');
  const[image, setImage] = useState(null);

  const[open, setOpen] = useState(false);

  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut();
    window.location.reload();
  }

  const getSession = async () => {
    const {data} = await supabase.auth.getSession();

    if (!data.session) return;

    setUser(data.session.user.email);
    
    if(data.session.user.user_metadata.avatar_url){
      setImage(data.session.user.user_metadata.avatar_url)
    }
  }

  useEffect(() => {
    getSession();
  }, [])

  const handleDots = () => 
    setOpen(current => !current);
  
  return (
    <div className="header">
      <div className="left">
        <p className='logout' onClick={handleLogout} ><Arrow/></p>
        <img  src={image || "/user.png"} alt="avatar" />
        <p className='name'>@{user ? user.split('@')[0] : ""}
          <span>Online</span>
        </p>
      </div>
      <p className="dots" onClick={handleDots}><Dots/></p>

      <div className={`float-out ${ open ? "open" : "" }`} onClick={handleLogout}>
        logout
      </div>

    </div>
  )
}
