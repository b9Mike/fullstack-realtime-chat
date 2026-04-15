import { useEffect, useState } from 'react'
import './App.css'
import { Messages } from './components/Messages'
import { Login } from './components/Login'
import { supabase } from './supabaseClient'

function App() {
  const [session, setSession] = useState(null);

  const getSession = async () => {
    const {data} = await supabase.auth.getSession();
    setSession(data.session);
  }

  useEffect(() => {
    getSession();
  }, [])

  return (
    <div className="App">
      <h1>Whatsapp clone</h1>
      <p>ReactJs & Supabase</p>
      {session ? <Messages/> : <Login/>}

    </div>
  )
}

export default App
