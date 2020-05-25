import React, {useEffect, useContext, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

import useFetch from '../../hooks/useFetch2'
import Loading from '../../components/loading'
import ErrorMessage from '../../components/errorMessage'
import TagList from '../../components/tagList'
import {CurrentUserContext} from '../../contexts/currentUser'

export default (props) => {
  const slug = props.match.params.slug
  const apiUrl = `/articles/${slug}`
  
  const [fetch, doFetch] = useFetch(apiUrl)

  const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)
  const [currentUserState] = useContext(CurrentUserContext)
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false)
  
  const isAuthor = () => {
    
    console.log("fetch:", fetch);
    
    if (currentUserState.isLoggedIn === false || fetch.isSuccess === false) {
      return false
    }
    
    return (
      currentUserState.currentUser.username === fetch.response.article.author.username
    )
  }

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete'
    })
  }
  
  useEffect(() => {
    doFetch()
  }, [doFetch])

  useEffect(() => {
    if (!deleteArticleResponse) {
      return
    }

    setIsSuccessfullDelete(true)
  }, [deleteArticleResponse])

  if (isSuccessfullDelete) {
    return <Redirect to="/" />
  }

  return (
    <div className="article-page">
      <div className="banner">
        {fetch.isSuccess === true && (
          <div className="container">
            <h1>{fetch.response.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetch.response.article.author.username}`}
              >
                <img src={fetch.response.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetch.response.article.author.username}`}
                >
                  {fetch.response.article.author.username}
                </Link>
                <span className="date">
                  {fetch.response.article.createdAt}
                </span>
              </div>
              { isAuthor() && (
                <span>
                  <Link
                    to={`/articles/${fetch.response.article.slug}/edit`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="ion-edit"></i>
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a"></i>
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        <Loading isLoading={fetch.isLoading}/>
        <ErrorMessage error={fetch.error}/>
        {fetch.isSuccess && (
          <div className="row article-content">
            <div>
              <p>{fetch.response.article.body}</p>
            </div>
            <TagList tags={fetch.response.article.tagList} />
          </div>
        )}
        <hr />
      </div>
    </div>
  )
}
