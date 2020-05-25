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
  const params = stringify({
    limit,
    offset
  })
  const apiUrl = `/articles?${params}`
  const currentUrl = match.url
  const [fetch, doFetch] = useFetch(apiUrl)

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
            <Loading isLoading={fetch.isLoading} />
            <ErrorMessage error={fetch.isError} />
            {fetch.isSuccess && (
              <Fragment>
                <Feed articles={fetch.response.articles} />
                <Pagination
                  total={fetch.response.articlesCount}
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
