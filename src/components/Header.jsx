import React, { useEffect, useState } from 'react';
import { IMG_URL } from '../helper/apirequests';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeaderDetails, selectHeaderDetails } from '../features/common/commonSlice';
import { truncateText } from '../helper';
import Ratings from './Ratings';
import GenreLinks from './GenreLinks';
import VideoPlayer from './VideoPlayer';
import { Link } from 'react-router-dom';

function Header({ video, platform }) {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(selectHeaderDetails);
    const [isVideo, setIsVideo] = useState(false);

    useEffect(() => {
        if (video) {
            dispatch(fetchHeaderDetails({ platform: platform, id: video.id }))
        }
    }, [video])

    const handleVideo = () => {
        setIsVideo(true);
    }
    return (
        <div className='vh-100'>
            {
                status === "success" ?
                    isVideo ?
                        <VideoPlayer videos={data.videos.results} />
                        :
                        <>
                            <img className='img-fluid w-100 h-100 object-fit-cover' src={`${IMG_URL}${data.backdrop_path}`} alt="" />
                            <div className='caption position-absolute text-white top-50 translate-middle-y'>
                                <h1 className='title display-3 fw-bold'>{truncateText(data.name || data.original_name || data.title || data.original_title, 50)}</h1>
                                <h3 className='tagline fs-2 text-warning'>{data.tagline}</h3>
                                <p className='fs-5'>{truncateText(data.overview, 150)}</p>
                                <Ratings voteAverage={data.vote_average} voteCount={data.vote_count} />
                                <GenreLinks genres={data.genres} platform = {platform} />

                                <div className='mt-3 d-flex gap-2'>
                                    <button onClick={handleVideo} className='btn btn-danger'>Play</button>
                                    <Link to={`/details/${platform}/${data.id}`} className='btn btn-warning'>More Info</Link>
                                    {/* <button className='btn btn-warning'>More Info</button> */}
                                </div>
                            </div>
                            <div className='header-vignette'></div>
                            <div className="header-bottom-vignette"></div>
                        </>
                    : status === "loading" ?
                        <p>...Loading</p>
                        : <p>Somethimg Went Wromg</p>
            }

        </div>
    );
}

export default Header;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fetchHeaderDetails, selectHeaderDetails } from '../features/common/commonSlice';
// import { truncateText } from '../helper';
// import { IMG_URL } from '../helper/apirequests';
// import GenreLinks from './GenreLinks';
// import Ratings from './Ratings';
// import VideoPlayer from './VideoPlayer';

// function Header({ video, platform }) {
//     const dispatch = useDispatch();
//     const { data, status, error } = useSelector(selectHeaderDetails);
//     const [isVideo, setIsVideo] = useState(false);

//     useEffect(() => {
//         if (video) {
//             dispatch(fetchHeaderDetails({ platform: platform, id: video.id }))
//         }
//     }, [video])

//     const handleVideo = () => {
//         setIsVideo(true);
//     }

//     return (
//         <div className='vh-100'>
//             {
//                 status === "success" ?
//                     isVideo ?
//                         <VideoPlayer videos={data.videos.results} />
//                         :
//                         <>
//                             <img className='img-fluid w-100 h-100 object-fit-cover' src={`${IMG_URL}${data.backdrop_path}`} alt='' />
//                             <div className='caption position-absolute text-white top-50 translate-middle-y'>
//                                 <h1 className='title display-3 fw-bold'>{truncateText(data.name || data.original_name || data.title || data.original_title, 50)}</h1>
//                                 <h3 className='tagline fs-2 text-warning'>{data.tagline}</h3>
//                                 <p className='fs-5'>{truncateText(data.overview, 150)}</p>
//                                 <Ratings voteAverage={data.vote_average} voteCount={data.vote_count} />
//                                 <GenreLinks genres={data.genres} platform={platform} />

//                                 <div className='mt-3 d-flex gap-2'>
//                                     <button onClick={handleVideo} className='btn btn-danger'>Play</button>
//                                     <Link to={`/details/${platform}/${data.id}`} className='btn btn-warning'>More Info</Link>
//                                 </div>
//                             </div>

//                             <div className='header-vignette'></div>
//                             <div className='header-bottom-vignette'></div>
//                         </>
//                     : status === "loading" ?
//                         <p>...Loading</p>
//                         : <p>Something went wrong</p>
//             }
//         </div>
//     );
// }

// export default Header;