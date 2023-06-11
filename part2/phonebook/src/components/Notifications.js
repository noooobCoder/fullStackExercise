const Notification = ({message}) => {
  if(message === null){
    return null
  }

  const color = message.startsWith('Infomation') ? 'red' : 'green'
  
  return (
    <div className="notification" style={{color: color}}>
      {message}
    </div>
  )
}

export default Notification