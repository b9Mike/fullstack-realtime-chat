import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Message } from './Message';
import { Header } from './Header';

export const Messages = () => {

  const [messages, setMessages] = useState([]);

  const callSupabase = async () => {
    const {data} = await supabase.from('messages').select('*');
    setMessages(data);
  }

  useEffect(() => {
    callSupabase();
  }, [])

  return (
    <section className='messages'>
      <Header/>
      <div className='content'>
        {
          messages && 
          messages.map((item, index) => ( 
            <Message 
              key={index}
              message={item.content}
              date={item.created_at}
              email={item.email}
            /> 
          ))
        }
      </div>
    </section>
  )
}
