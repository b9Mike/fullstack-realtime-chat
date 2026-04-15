import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Message } from './Message';
import { Header } from './Header';
import { SendMessage } from './SendMessage';

export const Messages = () => {

  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const [user, setUser] = useState("");
  
  const getSession = async () => {
    const {data} = await supabase.auth.getSession();
    setUser(data.session.user.email);
  }

  useEffect(() => {
    getSession();
  }, [])

  const callSupabase = async () => {
    const {data} = await supabase.from('messages').select('*');
    setMessages(data);
  }

  useEffect(() => {
    callSupabase();
  }, [])

  useEffect(() => {
    const chanel = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages"
        },
        (payload) => {
          const newMessage = payload.new;
          setMessages(messages => [...messages, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chanel);
    }
  }, [])


  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth', block: 'end'});
  }, [messages]);


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
              user={user}
              
            /> 
          ))
        }
      </div>
      <SendMessage scroll={scroll}/>
      <span ref={scroll}></span>
    </section>
  )
}
