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
    setUser(data.session.user.id);
  }

  useEffect(() => {
    getSession();
  }, [])

  const callSupabase = async () => {
    const { data } = await supabase
    .from('messages')
    .select(`
      id,
      content,
      created_at,
      user_id,
      users (
        id,
        name,
        email,
        avatar_url
      )
    `);
    setMessages(data);
  }

  useEffect(() => {
    callSupabase();
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages"
        },
        async (payload) => {

          const { data } = await supabase
            .from("messages")
            .select(`
              id,
              content,
              created_at,
              user_id,
              users (
                email,
                avatar_url
              )
            `)
            .eq("id", payload.new.id)
            .single();

          setMessages((prev) => [...prev, data]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


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
              email={item.users?.email}
              avatar={item.users?.avatar_url}
              user={user}
              user_id={item.user_id}
            />
          ))
        }
      </div>
      <SendMessage scroll={scroll}/>
      <span ref={scroll}></span>
    </section>
  )
}
