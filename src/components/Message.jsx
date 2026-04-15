import { formatDate } from '../helpers/formatDate'
import { getColorFromEmail } from '../helpers/getColorFromEmail'

export const Message = ({ message, date, user_id, user, avatar, email }) => {
  return (
  <div className={`message-row ${user === user_id ? "me" : ""}`}>

    <img 
      src={avatar || "/user.png"} 
      alt="user image" 
      className="user-image"
    />

    <div className={`card ${user === user_id ? "me" : ""}`}>
      <p>{message}</p>
      <span>{formatDate(date)}</span>
      <span 
        className='user-email' 
        style={{ color: getColorFromEmail(email || '') }}
      >
        {email?.split('@')[0]}
      </span>
    </div>

  </div>
)
}
