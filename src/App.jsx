import { useEffect, useState } from 'react'
import './App.css'
import { Messages } from './components/Messages'
import { Login } from './components/Login'
import { supabase } from './supabaseClient'
import {createUserIfNotExists } from './helpers/createUserIfNotExists'

 
function App() {
  const [session, setSession] = useState(null);

  const getSession = async () => {
    const {data} = await supabase.auth.getSession();
    setSession(data.session);
  }

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session?.user) {
        await createUserIfNotExists(data.session.user);
      }
    };

    getSession();
  }, []);

  return (
    <div className="App">
      <h1>Whatsapp clone</h1>
      <p>ReactJs & Supabase</p>
      {session ? <Messages/> : <Login/>}

    </div>
  )
}

export default App
