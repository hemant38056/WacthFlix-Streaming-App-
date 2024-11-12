import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNowPlayingMovies, selectNowPlayingMovies } from '../features/movie/movieSlice';
import Card from './Card';
import axios from '../helper/axios';
import { apirequests } from '../helper/apirequests';

function Row({action, selector, title, platform, genre}) {
    const dispatch = useDispatch();
    const collection = useSelector(genre ? (state) => state : selector);

    const[videosByGenre, setVideosByGenre] = useState(null);

    const fetchVideoByGenre = async (platform, genreid) => {
        try{
            const response = await axios.get(apirequests.getVideosByGenres(platform, genreid));
            setVideosByGenre(response.data);
        }
        catch(err){
            console.log(err.message);
        }
    }


    useEffect(() => {
        if(genre){
            fetchVideoByGenre(platform, genre.id);
        }
        else{
            dispatch(action());
        }
        
    }, [genre])
    return (
        <div className='py-3'>
            <h2 className='mb-3'>{title}</h2>
            {
                genre ? 
                <Swiper
                spaceBetween={20}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    videosByGenre?.results.map((video) => {
                        return (
                            <SwiperSlide key={video.id}>
                                <Card video = {video} platform={platform} />
                            </SwiperSlide>
                        )
                    })
                }


                </Swiper>
                :
                collection.status === "success" ?
                <Swiper
                spaceBetween={20}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    collection.data?.results.map((video) => {
                        return (
                            <SwiperSlide key={video.id}>
                                <Card video = {video} platform={platform} />
                            </SwiperSlide>
                        )
                    })
                }


                </Swiper>
                : collection.status === "loading" ? 
                    <p>...loading</p>
                    : <p>Something went wrong</p>
            }

            
           
        </div>
    );
}

export default Row;