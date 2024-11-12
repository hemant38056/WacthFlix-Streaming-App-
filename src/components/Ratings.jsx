import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';

function Ratings({ voteAverage, voteCount }) {
    const voteAvg = Math.floor(voteAverage / 2);
    const voteArr = [...Array(5)];
    return (
        <div className='py-2'>
            <div className='d-flex gap-1'>
            {
                voteArr.map((item, index) => (
                    index <= voteAvg ?
                    <FontAwesomeIcon key={index} icon={solidStar} />
                    :
                    <FontAwesomeIcon key={index} icon={faStar} />
                ))
                
            }
            </div>
            
        </div>
    );
}

export default Ratings;