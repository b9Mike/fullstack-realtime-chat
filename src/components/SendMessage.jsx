import { useEffect, useState } from 'react'
import Send from './icons/Send'
import { supabase } from '../supabaseClient'

export const SendMessage = () => {

  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState();

  const SendMessage = async (e) => {
    e.preventDefault();

    if(newMessage !== ""){
      const insert = await supabase.from("messages").insert({
        content: newMessage,
        email: user
      })
      setNewMessage("");
    }
  }

  const getSession = async () => {
    const {data} = await supabase.auth.getSession();
    setUser(data.session.user.email);
  }

  useEffect(() => {
    getSession();
  }, [])

  return (
    <section className="send-message">
      <form onSubmit={SendMessage}>
        <input type="text" 
          name='Message'
          placeholder='Write your message'
          onChange={ e => setNewMessage(e.target.value)}
          value={newMessage}
        />

        <button type='submit'><Send/></button>

      </form>
    </section>
  )
}
