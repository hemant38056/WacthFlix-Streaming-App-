import React from 'react';
import {IMG_URL} from '../helper/apirequests';
import Ratings from './Ratings';

function EpisodesList({episodes}) {
    return (
        <div className='py-2'>
            {
                episodes?.map((episode) => (
                    <div className="row">
                        <div className="col-1">{episode.episode_number}</div>
                        <div className="col-2"><img className='img-fluid' src={IMG_URL + episode.still_path} alt={episode.name} /></div>
                        <div className="col-2"><h5>{episode.name}</h5></div>
                        <div className="col-4"><p>{episode.overview}</p></div>
                        <div className="col-2"><Ratings voteAverage = {episode.vote_average} voteCount = {episode.vote_count} /></div>
                        <div className="col-1">{episode.air_date}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default EpisodesList;