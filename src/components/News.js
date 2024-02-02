import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Hello from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsChurner`
  }

  fetchMoreData = async() => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.setState({page:++this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setTimeout(() => {
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      })
    }, 1500);
  };

  async updatePage() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json()
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c1408a05f5b4b30887cf348a937ad7f&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })

    this.updatePage();
  }

  // const [page, setPage] = useState(1)

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c1408a05f5b4b30887cf348a937ad7f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false
    // })

    this.setState({ page: this.state.page - 1 }, () => {
      // Call updateNews() after the state has been updated
      this.updatePage();
    });
  }


  handleNextClick = async () => {
    // console.log(this.state.page);
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    // }
    // else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c1408a05f5b4b30887cf348a937ad7f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
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

    this.setState({ page: this.state.page + 1 }, () => {
      // Call updateNews() after the state has been updated
      this.updatePage();
    });
  }

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsChurner - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className='row'>
            {this.state.articles.map((element) => {
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
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News