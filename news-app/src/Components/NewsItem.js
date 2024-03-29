import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsURL, titleLen, desLen } = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{ width: "18rem", height: "28rem" }}>
                    <img src={imageUrl} className="card-img-top" alt="..." style={{height: "200px", width: "286px"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{titleLen ? title+"..." : title }</h5>
                        <p className="card-text">{desLen ? description+"..." : description }</p>
                        <a href={newsURL} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem