import React, {useEffect, Fragment} from 'react'
import {stringify} from 'query-string'

import Feed from '../../components/feed'
import useFetch from '../../hooks/useFetch2'
import Pagination from '../../components/pagination'
import {getPaginator, limit} from '../../utils'
import PopularTags from '../../components/popularTags'
import Loading from '../../components/loading'
import ErrorMessage from '../../components/errorMessage'
import FeedToggler from '../../components/feedToggler'
import Banner from '../../components/banner'

const GlobalFeed = ({location, match}) => {
  const {offset, currentPage} = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset
  })
  const apiUrl = `/articles?${stringifiedParams}`
  const currentUrl = match.url
  const [result, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [currentPage, doFetch])

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {result.isLoading && <Loading />}
            {result.error && <ErrorMessage />}
            {!result.isLoading && result.response && (
              <Fragment>
                <Feed articles={result.response.articles} />
                <Pagination
                  total={result.response.articlesCount}
                  limit={limit}
                  url={currentUrl}
                  currentPage={currentPage}
                />
              </Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalFeed
