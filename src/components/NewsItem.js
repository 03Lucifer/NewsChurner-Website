import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        // let {title, description} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }>
                        <span className="badge rounded-pill bg-danger"> {this.props.source} </span>
                    </div>
                    <img src={this.props.imageURL ? this.props.imageURL : "https://bsmedia.business-standard.com/_media/bs/img/article/2019-08/14/full/1565801938-3166.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}...  </h5>
                        <p className="card-text">{this.props.description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {this.props.author ? this.props.author : "Unknown"} on {new Date(this.props.date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={this.props.newsURL} target="_blank" className="btn btn-dark btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem

