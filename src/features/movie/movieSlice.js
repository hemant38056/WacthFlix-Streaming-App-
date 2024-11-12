import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../helper/axios';
import { apirequests, endponts, platformTypes } from "../../helper/apirequests";

const initialState = {
    nowPlaying : {
        status : "idle",
        data : null,
        error : null
    }
}

export const fetchNowPlayingMovies = createAsyncThunk(
    "movie/fetchNowPlayingMovies",
    async () => {
        const response = await axios.get(apirequests.getCollection(platformTypes.movie, endponts.nowPlaying));
        return response.data;
    }
)

export const movieSlice = createSlice({
    name : "movie",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchNowPlayingMovies.pending, (state) => {
            state.nowPlaying.status = "loading";
        })
        .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
            state.nowPlaying.status = "success";
            state.nowPlaying.data = action.payload;
        })
        .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
            state.nowPlaying.status = "error";
            state.nowPlaying.error = action.error;
        })
    }
})

export const selectNowPlayingMovies = (state) => state.movie.nowPlaying;
export default movieSlice.reducer;