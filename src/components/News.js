import React, { useState } from 'react'
import { useEffect } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${this.capitalizeFirstLetter(props.category)} - NewsChurner`

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  const updatePage = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json()
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    updatePage()
  }, [])

  // const [page, setPage] = useState(1)

  const handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2c1408a05f5b4b30887cf348a937ad7f&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false
    // })

    setPage(page - 1)
    // Call updateNews() after the state has been updated
    updatePage();
  }


  const handleNextClick = async () => {
    // console.log(this.state.page);
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
    // }
    // else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2c1408a05f5b4b30887cf348a937ad7f&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //   this.setState({ loading: true })
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     page: this.state.page + 1,
    //     loading: false
    //   })
    // }

    setPage(page + 1)
    // Call updateNews() after the state has been updated
    updatePage();
  }

  return (
    <>
      <h1 className="text-center" style={{ marginTop: '90px', marginBottom: '30px' }}>NewsChurner - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className='row'>
            {articles.map((element) => {
              return <div className="col-md-3" key={element.url} >
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                  imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-dark mx-4">&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
        </div> */}
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News