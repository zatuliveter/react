import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'

import useFetch from '../hooks/useFetch2'
import ErrorMessage from './errorMessage'
import Loading from './loading'

export default () => {
  const [fetch, doFetch] = useFetch('/tags')

  useEffect(() => doFetch(), [doFetch])
  
  return (
    <Fragment>
      <Loading isLoading={fetch.isLoading}/>
      <ErrorMessage error={fetch.error}/>
      { fetch.isSuccess && (
        <div className="sidebar">
          <p>Popular tags</p>
          <div className="tag-list">
            {fetch.response.tags.map(tag => (
              <Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  )
}

