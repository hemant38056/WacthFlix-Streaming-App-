import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchQuery } from "../features/common/commonSlice";
import { useDispatch } from "react-redux";

function Navbar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSearch = (e) => {
        let {value} = e.target;
        
        if(value.length > 2){
            dispatch(searchQuery(value));
            navigate("/search");
        }
    }
    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand text-white " to="/">
                    Streaming App
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="browse/movie">
                                Movies
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="browse/tv">
                                Tv Shows
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="browsebygenre/movie/28">
                                Browse By Genre
                            </Link>
                        </li>
                    </ul>
                    <div className="ms-auto">
                        <input onChange={handleSearch} type="search" className="form-control" placeholder="search" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
