import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, selectNetflixOriginals } from '../features/tv/tvSlice';
import Header from '../components/Header';
import Row from '../components/Row';
import { fetchNowPlayingMovies, selectNowPlayingMovies } from '../features/movie/movieSlice';
import { platformTypes } from '../helper/apirequests';
import { useTitle } from '../hooks/useTitle';

function Homescreen(props) {
    useTitle("Streaming App | Home")
    const dispatch = useDispatch();
    const {data, status, error} = useSelector(selectNetflixOriginals);

    useEffect(() => {
        dispatch(fetchNetflixOriginals())
    }, [])
    return (
        <>
            {
                status === "success" ?
                <Header video = {data.results[Math.floor(Math.random()*data.results.length)]} platform = {platformTypes.tv} />
                : status === "loading" ? <p>...loading</p>
                    : <p>Something went wrong</p>
            }

            <div className="container-fluid">
                <Row title="Now Playing" action={fetchNowPlayingMovies} selector={selectNowPlayingMovies} platform = {platformTypes.movie} />
                <Row title="Netflix Originals" action={fetchNetflixOriginals} selector={selectNetflixOriginals} platform = {platformTypes.tv} />
            </div>
            
        </>
    );
}

export default Homescreen;