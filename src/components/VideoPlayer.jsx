import React, { useEffect, useState } from 'react';

function VideoPlayer({videos}) {
    const[trailer, setTrailer] = useState(null);
    useEffect(() => {
        const filteredVideo = videos.find((video) => (
            video.type === "Trailer"
        ))
        setTrailer(filteredVideo);
    }, [videos])
    return (
        trailer ?
            <div className='ratio ratio-16x9'>
                <iframe src={`https://www.youtube.com/embed/${trailer.key}?rel=0&autoplay=1&mute=1`} title={trailer.name} allowFullScreen></iframe>
            </div> :
            <div>No Video to display</div>
    );
}

export default VideoPlayer;