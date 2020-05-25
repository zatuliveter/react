import React from 'react'

export default ({isError, errors}) => {
  
  if (!isError) return null
  
  return (
    <div>
      <h4>Something bad happened...</h4>
      { errors && (
        <div>
          {errors}
        </div>
      )}
    </div>
  )
}
