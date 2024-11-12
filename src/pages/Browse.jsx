import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apirequests, platformTypes } from '../helper/apirequests';
import { fetchNetflixOriginals, selectNetflixOriginals } from '../features/tv/tvSlice';
import { fetchNowPlayingMovies, selectNowPlayingMovies } from '../features/movie/movieSlice';
import Header from '../components/Header';
import axios from '../helper/axios';
import { shuffle } from '../helper';
import Row from '../components/Row';
import {useTitle} from '../hooks/useTitle';

function Browse(props) {
    const params = useParams();
    useTitle(`Streaming App | ${params.platform.toLocaleUpperCase()}`);
    const dispatch = useDispatch();

    const [genreList, setGenreList] = useState(null);
    const {data, status , error} = useSelector(params.platform === platformTypes.tv ? selectNetflixOriginals : selectNowPlayingMovies);

    const fetchGenreList = async (platform) => {
        try{
            const response = await axios.get(apirequests.getGenres(platform));
            if(response.status === 200){
                setGenreList(shuffle(response.data.genres));
            }
           
        }catch(err){
            console.log(err.message);
        }
        
    }

    useEffect(() => {
        if(params){
            fetchGenreList(params.platform);
        }
    }, [params])

    useEffect(() => {
        if(params.platform === platformTypes.tv){
            dispatch(fetchNetflixOriginals());
        }
        else{
            dispatch(fetchNowPlayingMovies());
        }
    }, [params.platform])
    return (
        <>
             {
                status === "success" ?
                <Header video = {data.results[Math.floor(Math.random()*data.results.length)]} platform = {params.platform} />
                : status === "loading" ? <p>...loading</p>
                    : <p>Something went wrong</p>
            }
            <div className="container-fluid">
                {
                    genreList ?
                    genreList.map((genre, index) => (
                        index < 6 ?
                        <Row key={genre.id} title={genre.name} genre={genre} platform={params.platform}/>
                        : ""
                    ))
                    : ""
                }
            </div>
        </>
    );
}

export default Browse;