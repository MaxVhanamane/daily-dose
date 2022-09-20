import React,{useState} from 'react'

export default function NewsItem(props) {
const [date]=useState(new Date(props.time).toGMTString().toString())
        return (

<>
            <div className="card m-2 shadow " >
                <img width="474" height="266"  src={props.imageUrl ? props.imageUrl : "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"> {props.title}</h5>
                    <p className="card-text ">{props.description.substring(0, 100) + "..."}</p>
                    <p className="card-text"><small className="text-muted">{props.source} <strong>&#183;</strong> By {props.author? props.author:"Unknown"} on {date}</small></p>
                    <a href={props.url} className="btn btn-warning btn-sm" target="_blank" rel="noreferrer">Read More...</a>
                </div>
            </div>
</>
        )
    
}
