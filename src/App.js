import './App.css';
import Navbar from "./components/Navbar";
import News from "./components/News";
import React, { useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default function App ()  {
 

const [progress,setProgress]=useState(0)


const setProgressVal = (progressVal) => {
    setProgress(progressVal)
  }

    return (
      // To avoid reloading of page when we move to another link or page we use Router. 
      <Router>
        <div>
          {/* LoadingBar is used to show page loading progress. read documentation for better understanding. */}
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
          />
          <Navbar />

          <Routes>

            <Route exact path="/" element={<News key="home" pageSize={100} setProgress={setProgressVal}  category="news" title="Home"/>} />

            <Route exact path="/business" element={<News key="business" pageSize={100} setProgress={setProgress}  category="business" title="Business"/>} />

            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={100} setProgress={setProgress}  category="entertainment" title="Entertainment"/>} />

            <Route exact path="/politics" element={<News key="politics" pageSize={100} setProgress={setProgress}  category="politics" title="Politics"/>} />

            <Route exact path="/sports" element={<News key="sports" pageSize={100} setProgress={setProgress}  category="sport"title="Sports" />} />

            <Route exact path="/science" element={<News key="science" pageSize={100} setProgress={setProgress}  category="science" title="Science"/>} />

            <Route exact path="/technology" element={<News key="technology" pageSize={100} setProgress={setProgress}  category="tech" title="Technology"/>} />

          </Routes>

        </div>
      </Router>
    )
  
}


