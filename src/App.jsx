import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Messages } from './components/Messages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Whatsapp clone</h1>
      <Messages/>
    </div>
  )
}

export default App
