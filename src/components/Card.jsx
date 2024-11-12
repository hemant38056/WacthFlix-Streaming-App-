import React from 'react';
import { IMG_URL } from '../helper/apirequests';
import Ratings from './Ratings';
import { useNavigate } from 'react-router-dom';

function Card({video, platform}) {
    const navigate = useNavigate();
    const handleDetails = () => {
        navigate(`/details/${platform}/${video.id}`)
    }
    return (
        <div className='card text-white cursor-pointer' onClick={handleDetails}>
            <img className='card-img-top' src={`${IMG_URL}${video.backdrop_path}`} alt="t" />
            <div className="card-body">
                <h5 className="card-title ">{video.name || video.original_name || video.title || video.original_title}</h5>
                <Ratings voteAverage={video.vote_average} voteCount={video.vote_count}/>
            </div>
        </div>
    );
}

export default Card;