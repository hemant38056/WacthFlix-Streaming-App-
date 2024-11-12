import React, { useEffect, useState } from 'react';
import { apirequests } from '../helper/apirequests';
import EpisodesList from './EpisodesList';
import axios from '../helper/axios';

function Seasons({seasonsList, seriesId}) {
    const[episodesList, setEpisodesList] = useState(null);

    const fetchEpisodesList = async (seriesid, seasonnumber) => {
        try{
           const response = await axios.get(apirequests.getEpisodesList(seriesid, seasonnumber));
           setEpisodesList(response.data.episodes); 
        }catch(error){
            console.log(error);            
        }
    }

    const handleSeason = (e) => {
        let {value} = e.target;
        fetchEpisodesList(seriesId, value);
    }

    useEffect(() => {
        if(seasonsList && seriesId){
            fetchEpisodesList(seriesId, seasonsList[0].season_number)
        }
    }, [seasonsList, seriesId])
    return (
        <div className='py-2'>
            <div className="d-flex align-items-center jutify-content-between">
                <h3>Season Details</h3>
                <div className="d-flex align-items-center">
                    <label className='me-2'>Select Season</label>
                    <select className='form-control' onChange={handleSeason}>
                        {
                            seasonsList?.map((season)=> (
                                <option key={season.id} value={season.season_number}>{season.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <EpisodesList episodes={episodesList}/>
        </div>
    );
}

export default Seasons;