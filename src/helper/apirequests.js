const baseUrl = 'https://api.themoviedb.org/3';
const API_KEY = '247edac6493aab6515fe6eea3ff3b17f';
export const IMG_URL =  'https://image.tmdb.org/t/p/original';
export const apirequests = {
    getNetflixOriginals : `${baseUrl}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    getCollection : (platform, endpoint) => {return  `${platform}/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`},
    // getDetails : (platform, id) => {return `${platform}/${id}?api_key=${API_KEY}&language=en-US`}
    getDetails : (platform, id) => {return `${platform}/${id}?api_key=${API_KEY}&append_to_response=videos,recommendations,similar,credits`},
    getGenres : (platform) => {return `/genre/${platform}/list?api_key=${API_KEY}`},
    getVideosByGenres : (platform, genreid) => { return `/discover/${platform}?api_key=${API_KEY}&with_genres=${genreid}&page=1`},
    getVideosBySearch : (platform, query) => {return `/search/${platform}?api_key=${API_KEY}&query=${query}`},
    getEpisodesList : (seriesid, seasonNumber) => {return `/tv/${seriesid}/season/${seasonNumber}?api_key=${API_KEY}`}
}

//request example - 'https://api.themoviedb.org/3/discover/tv?api_key=247edac6493aab6515fe6eea3ff3b17f&with_networks=213`
// getVideosByGenres : (platform, genreid, page) => { return `/discover/${platform}?api_key=${API_KEY}&with_genres=${genreid}&page=1`}, here page is dynamic

export const platformTypes = {
    tv : "tv",
    movie : "movie"
}

export const endponts = {
    popular : "popular",
    topRated : "top_rated",
    upcoming : "upcoming",
    nowPlaying : "now_playing",
    onTheAir : "on_the_air",
    airingToday : "airing_today"
}