import React from 'react'

const ErrorMessage = ({error}) => {
  
  if (!error) return null
  
  return (
    <div>
      <h4>Something bad happened...</h4>
      <div>
        {error}
      </div>
    </div>
  )
}

export default ErrorMessage
