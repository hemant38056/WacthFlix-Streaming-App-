import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails, selectVideoDetails } from '../features/common/commonSlice';
import VideoPlayer from '../components/VideoPlayer';
import { IMG_URL, platformTypes } from '../helper/apirequests';
import Card from '../components/Card';
import Seasons from '../components/Seasons';
import { useTitle } from '../hooks/useTitle';
import useLocalStorage from '../hooks/useLocalStorage';
import Ratings from '../components/Ratings';

function Details(props) {
    const { data, status, error } = useSelector(selectVideoDetails);
    const params = useParams();
    useTitle(`Streaming App | ${data?.name || data?.original_name || data?.title || data?.original_title}`);
    const dispatch = useDispatch();
    const [writers, setWriters] = useState(null);

    const [local, setLocal] = useLocalStorage("streaming", "hello");
    useEffect(() => {
        setLocal("Streaming App");
    }, [])

    const getWriters = (crew) => {
        const writers = crew.filter((item) => (
            item.known_for_department === "Writing"
        ));
        setWriters(writers);
    }


    useEffect(() => {
        if (params) {
            dispatch(fetchVideoDetails({ platform: params.platform, id: params.id }));
        }
    }, [params])


    useEffect(() => {
        if (data) {
            getWriters(data.credits.crew)
        }
    }, [data])

    return (
        data ?
            <div className='py-5 mt-4'>
                <div className='container'>
                    <div className="mb-5">
                        <h3>{local}</h3>
                        <VideoPlayer videos={data.videos.results} />
                    </div>

                    <div className='row'>
                        <div className="col-lg-3">
                            <img className='img-fluid' src={`${IMG_URL}${data.poster_path}`} alt={data.title || data.name} />
                        </div>

                        <div className='col-lg-9'>
                            <h1 className='font-display mb-5'>{data?.title || data?.original_title || data?.name || data?.original_name}</h1>
                            <h3 className='mb-4'>{data?.tagline !== "" && data?.tagline}</h3>
                            <div>
                            <Ratings voteAverage={data?.vote_average} voteCount={data?.vote_count} />
                        </div>
                        <div>
                            Runtime : {data?.runtime} mins
                        </div>
                        <div>
                            Release Date : {data?.release_date || data?.first_air_date}
                            <p>{data?.overview}</p>
                        </div>
                        </div>

                        <div className="col-lg-9">
                            {/* Recommended */}
                            <>
                                <h4>Recommended {params.platform === "movie" ? "Movies" : "Tv Shows"}</h4>
                                <div className="row gy-4">
                                    {
                                        data.recommendations.results.map((video, index) => (
                                            index < 6 ?
                                                <div key={video.id} className="col-lg-4">
                                                    <Card video={video} platform={params.platform} />
                                                </div> : ""
                                        ))
                                    }
                                </div>
                            </>

                            {/* Writers */}
                            <div className="py-4">
                                <h3>Writers</h3>
                                <div className="d-flex">
                                    Writers : {
                                        writers?.map((writer) => (
                                            <>
                                                <span className='ms-2' key={writer.id}>{writer.name}</span>
                                            </>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* seasons list */}
                            {
                                params.platform === platformTypes.tv && <Seasons seasonsList={data.seasons} seriesId={data.id} />
                            }
                        </div>
                    </div>
                </div>
            </div> : <p>Cant Load the Page</p>
    );
}

export default Details;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchVideoDetails, selectVideoDetails } from '../features/common/commonSlice';
// import VideoPlayer from '../components/VideoPlayer';
// import { IMG_URL } from '../helper/apirequests';
// import Card from '../components/Card';

// function Details(props) {
//     const { data, status, error } = useSelector(selectVideoDetails);
//     const params = useParams();
//     const dispatch = useDispatch();
//     const [writers, setWriters] = useState([]); // Initialize to an empty array

//     const getWriters = (crew) => {
//         const writers = crew.filter((item) => (
//             item.known_for_department === "Writing"
//         ));
//         setWriters(writers);
//     }

//     useEffect(() => {
//         if (params) {
//             dispatch(fetchVideoDetails({ platform: params.platform, id: params.id }));
//         }
//     }, [params, dispatch]);

//     useEffect(() => {
//         if (data) {
//             getWriters(data.credits.crew);
//         }
//     }, [data]);

//     return (
//         data ?
//             <div className='py-5 mt-4'>
//                 <div className='container'>
//                     <div className="mb-5">
//                         <VideoPlayer videos={data.videos.results} />
//                     </div>

//                     <div className='row'>
//                         <div className="col-lg-3">
//                             <img className='img-fluid' src={`${IMG_URL}${data.poster_path}`} alt={data.title || data.name} />
//                         </div>
//                         <div className="col-lg-9">
//                             <h4>Recommended {params.platform === "movie" ? "Movies" : "Tv Shows"}</h4>
//                             <div className="row gy-4">
//                                 {
//                                     data.recommendations.results.map((video, index) => (
//                                         index < 6 ?
//                                             <div key={video.id} className="col-lg-4">
//                                                 <Card video={video} platform={params.platform} />
//                                             </div> : ""
//                                     ))
//                                 }
//                             </div>
//                             <div className="py-4">
//                                 <h3>Writers</h3>
//                                 <div className="d-flex">
//                                     Writers: {
//                                         writers.map((writer) => (
//                                             <span className='ms-2' key={writer.id}>{writer.name}</span>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div> : <p>Can't Load the Page</p>
//     );
// }

// export default Details;
