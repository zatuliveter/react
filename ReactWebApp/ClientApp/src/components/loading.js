import React from 'react'

const Loading = ({isLoading}) => {

  if (isLoading === true)
    return <div>Loading...</div>
  else
    return null;
}

export default Loading
