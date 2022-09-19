
import React from 'react'
import { NavLink} from "react-router-dom" // using NavLink instead of using Link so that I can highlight active link. 
// just use NavLink it will automatically highlight active link and use css class ".active" to style the active link. 
import "../App.css"

export default function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-warning bg-warning">
                <div className="container-fluid">
                    <NavLink className="navbar-brand font-italic fw-bold fst-italic" to="/">Daily Dose</NavLink>
                    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon custom-toggler"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                            </li>


                            <li className="nav-item">
                                <NavLink className="nav-link" to="/business">Business</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/entertainment">Entertainment</NavLink>
                            </li>
                           
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/politics">Politics</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/sports">Sports</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/science">Science</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/technology">Technology</NavLink>
                            </li>



                        </ul>

                    </div>
                </div>
            </nav>
  )
}
