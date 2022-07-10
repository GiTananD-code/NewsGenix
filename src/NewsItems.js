import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let{title,description,imgUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left:'90%', zIndex:'1'}}>
            <span className="visually-hidden" />{source}</span>
            <img className="card-img-top" alt="" src={!imgUrl?"https://static.videezy.com/system/resources/thumbnails/000/014/052/original/loading-circle-bars.jpg":imgUrl}/>
            <div className="card-body">
            
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-secondary">Published by: {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} rel="noopener noreferrer" target="_blank" className="btn btn-sm btn-secondary">Read More</a>
                
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItems