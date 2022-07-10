import React, { Component } from 'react';
import NewsItems from '../NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country:'in',
        pageSize: 9,
        category:'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

articles = []    
constructor(props){
        super(props);
        this.state = {
            articles: this.articles,  
            loading: false,
            page: 1    
        }
        document.title = `NewsGenix - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

async newsUpdate(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1eb7228dce9c4d17afad618f28dbef63&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, 
                   totalResults:parsedData.totalResults,
                   loading:false
                }); 
}


async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1eb7228dce9c4d17afad618f28dbef63&page=1&pageSize=${this.props.pageSize}`; 
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles, 
    //                totalResults:parsedData.totalResults,
    //                loading:false
    //             }); 
    this.newsUpdate();
}


handlePrevClick= async()=>{
    // console.log("Previous") 
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1eb7228dce9c4d17afad618f28dbef63&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading:false
    // })
    await this.setState({page: this.state.page - 1});
    this.newsUpdate();
}

handleNextClick= async()=>{
    // console.log("Next")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1eb7228dce9c4d17afad618f28dbef63&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    
    // this.setState({
    //     page: this.state.page+1,
    //     articles: parsedData.articles,
    //     loading:false
    // })

    await this.setState({page: this.state.page + 1});
    this.newsUpdate();
}

  render(){
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{padding:"14px"}}>NewsGenix - Top HeadLines </h1>
        {this.state.loading && <Spinner/>}                           
        
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
           return<div className="col-md-4" key={element.url}>
           <NewsItems title={element.title} description={element.description?element.description.slice(0,84):""} 
           imgUrl = {element.urlToImage} newsUrl = {element.url} author={element.author} 
           date ={element.publishedAt} source={element.source.name}/>
           </div>
        })}     
        </div>
        
        <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1}  type="button" className="btn btn-success" onClick={this.handlePrevClick}>&larr; Previous </button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </div>

    )
  }
}

export default News