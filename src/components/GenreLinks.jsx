import React from 'react';
import {Link} from 'react-router-dom';

function GenreLinks({genres, platform}) {
    return (
        genres ?
        <div className='d-flex gap-1 py-2'>
            {
                genres.map((genre) => (
                    <Link to = {`/browsebygenre/${platform}/${genre.id}`} className="badge rounded-pill text-bg-warning text-decoration-none" key = {genre.id} >{genre.name}</Link>
                ))
            }
            
        </div> : ""
    );
}

export default GenreLinks;