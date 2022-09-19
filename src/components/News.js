import React, { useEffect } from 'react'
// To get updated value of state immediately we are using external package called react-usestateref because inbuild useState hook does not provide this
// feature
import useState from 'react-usestateref';
import NewsItem from "./NewsItem"
import Spinner from "./Spinner"
import PropTypes from 'prop-types'
// uuid is used to add unique key props
import { v4 as uuidv4 } from 'uuid';
// Adding external InfiniteScroll component to add infinite scrolling to the page.
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY
    const [articles, setArticles] = useState([])
    const [page, setPage, pageRef] = useState(1)
    const [loading, setLoading] = useState(true)  // setting loading: true so that it can show spinner when web app starts.
    const [totalResults, setTotalResults] = useState(0)

    // Adding a function to capitalize first letter of news heading (h1) and title.
    const capitalize = s => s && s[0].toUpperCase() + s.slice(1)
    // creating updateNews function to get news from news api
    async function updateNews(props) {
        // props.setProgress(10) this used to set progress value for top loading bar.
        props.setProgress(10)
        // page_size- How many news articles are in the returned JSON object
        // documentation - https://docs.newscatcherapi.com/api-docs/endpoints/search-news
        let axios = require("axios").default;

        let options = {
          method: 'GET',
          url:`https://api.newscatcherapi.com/v2/latest_headlines?countries=IN&lang=en&topic=${props.category}&page=${page}&page_size=${props.pageSize}`,
          
          headers: {
            'x-api-key': `${apiKey}`
          }
        };
        
        axios.request(options).then(function (response) {
            // console.log("yea",response.data);
            props.setProgress(50)
            // parsing the received data
            let parsedData = response.data
            // console.log(parsedData)
            props.setProgress(75)
            // Adding required data to the state
            setArticles(parsedData.articles)
            setTotalResults(parsedData.total_hits)
            setLoading(false) // as we have received the data so there is no need to show the spinner anymore.
            props.setProgress(100)
        }).catch(function (error) {
            return
        });

    }

    useEffect(() => {
        // Changing title as category changes
        document.title = `${props.title} - DailyDose`
        updateNews(props)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    // This function is required by the InfiniteScroll component
    const fetchMoreData = async (props) => {
        setPage(page + 1);
        //   console.log(page,"pageValue")
        //   console.log(pageRef.current,"pageRefValue")

        // pageRef.current :
        // As setPage will not give us updated value of page immediately so we are using pageRef.current to get updated value of page.
        // to get pageRef as third return value of useState we have to use external library called react-usestateref because current value is not given by
        // inbuit useState hook

        // This is another way to get updated value of page
        //   setPage((state) => {
        //     console.log(state); 

        //     return state;
        //   })
 
        // // There are other simple ways to give next value to the page but I wanted to use the state value as soon as it updates that's why 
        // // I used external library.
        // url:`https://api.newscatcherapi.com/v2/latest_headlines?countries=IN&lang=en&topic=${props.category}&page=${pageRef.current}&page_size=${props.pageSize}`
   
        let axios = require("axios").default;

        let options = {
          method: 'GET',
          url:`https://api.newscatcherapi.com/v2/latest_headlines?countries=IN&lang=en&topic=${props.category}&page=${pageRef.current}&page_size=${props.pageSize}`,
          
          headers: {
            'x-api-key': `${apiKey}`,
            'Content-Type': 'application/json',
          }
        };
        
        axios.request(options).then(function (response) {
        
            // parsing the received data
            let parsedData = response.data
            // Adding required data to the state
              // here concatinating the old articles to the new articles so that I can show all the news on a single page with infinite scolling 
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.total_hits)
           
        }).catch(function (error) {
            console.error(error);
        });
        

    };
    return (
        <>
           <div className="container my-4">
                <h1 className="text-center" style={{ marginTop: "90px" }}>Top {capitalize(props.category)} Headlines</h1>
                {loading && <Spinner />}

                {/* to use InfiniteScroll wrap the map function in InfiniteScroll component  
                        read the documentation for better understanding*/}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={() => fetchMoreData(props)}
                    hasMore={articles.length !== totalResults} //Check whether the next set of news is available or not.
                    loader={<Spinner />}  // This will be shown when data is loading
                >
                    <div className="container">
                        <div className="row my-3">
                            {articles.map((element) => {
                                return <div key={uuidv4()} className=" col-md-6 col-sm-12 col-lg-4 ">
                                    < NewsItem title={element.title ? element.title : "No title"} description={element.summary} imageUrl={element.media} url={element.link} author={element.author} time={element.published_date} source={element.rights} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </div>

        </>
    )

}

// Adding default props
News.defaultProps = {
    country: 'In',
    pageSize: 100
}

// Adding prop types
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
}
