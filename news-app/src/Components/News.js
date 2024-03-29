import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
    // constructor -> render -> componentDidMount
    // articles = [
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "MacRumors"
    //         },
    //         "author": "Mitchel Broussard",
    //         "title": "Samsung's Spring Sale Expands With Big Discounts on Galaxy Smartphones, Watches, Tablets, and Laptops",
    //         "description": "This weekend, we're tracking a new sale at Samsung with savings on the company's best smartphones, smartwatches, tablets, and laptops. These discounts are part of Samsung's larger Discover Samsung Spring Sale, which we started covering last week with deals on…",
    //         "url": "https://www.macrumors.com/2024/03/10/samsungs-spring-sale-expands/",
    //         "urlToImage": "https://images.macrumors.com/t/lulyy5z8sCC5bSsGPkL6HbFRKQk=/1920x/article-new/2024/03/samsung-hero-blue.jpg",
    //         "publishedAt": "2024-03-10T14:37:44Z",
    //         "content": "This weekend, we're tracking a new sale at Samsung with savings on the company's best smartphones, smartwatches, tablets, and laptops. These discounts are part of Samsung's larger Discover Samsung Sp… [+2337 chars]"
    //     }
    // ]
    constructor() {
        super()
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
    }
    checklength = (type, text) => {
        if (type === "title" && text.length > 45) {
            return true
        } else if (type === "description" && text.length > 88) {
            return true
        } else {
            return false
        }
    }
    // checkImage = (img) => {
    //     console.log("URL is", img)
    //     return fetch(img).then(response => {
    //         if (response.status >= 200 && response.status <= 400) {
    //             return img
    //         } else {
    //             return "././images/noImageAvailable.png"
    //         }
    //     }).catch(error => {
    //         console.error('Error checking image availability:', error);
    //         return "././images/noImageAvailable.png";
    //     })
    // }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-02-15&sortBy=publishedAt&apiKey=e054d88b09de49dfadf6cbb000f40d8c&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    handlePrevClick = async () => {
        this.setState({
            loading: true
        })
        let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-02-15&sortBy=publishedAt&apiKey=e054d88b09de49dfadf6cbb000f40d8c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        })
    }
    handleNextClick = async () => {
        this.setState({
            loading: true
        })
        if (this.state.page + 1 < Math.ceil(this.state.totalResults / this.props.pageSize)) {
            let url = `https://newsapi.org/v2/everything?q=tesla&from=2024-02-15&sortBy=publishedAt&apiKey=e054d88b09de49dfadf6cbb000f40d8c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            })
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>NewsApp - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                {!this.state.loading && <div className='row'>
                    {this.state.articles.map((element) => {
                        // a unique key should be present when using map
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsURL={element.url} titleLen={this.checklength("title", element.title ? element.title : "")} desLen={this.checklength("description", element.description ? element.description : "")} />
                        </div>
                    })}

                </div>
                }
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-info mx-2" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News;