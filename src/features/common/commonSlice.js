import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../helper/axios';
import { apirequests } from "../../helper/apirequests";

const initialState = {
    headerDetails : {
        status : "idle",
        data : null,
        error : null
    },
    videoDetails : {
        status : "idle",
        data : null,
        error : null
    },
    queryString : "",
}

export const fetchHeaderDetails = createAsyncThunk(
    "common/fetchHeaderDetails",
    async (param) => {
        const response = await axios.get(apirequests.getDetails(param.platform, param.id));
        return response.data;
    }
)

export const fetchVideoDetails = createAsyncThunk(
    "common/fetchVideoDetails",
    async (param) => {
        const response = await axios.get(apirequests.getDetails(param.platform, param.id));
        return response.data;
    }
)

export const commonSlice = createSlice({
    name : "common",
    initialState,
    reducers : {
        searchQuery : (state, action) => {
            state.queryString = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchHeaderDetails.pending, (state) => {
            state.headerDetails.status = "loading";
        })
        .addCase(fetchHeaderDetails.fulfilled, (state, action) => {
            state.headerDetails.status = "success";
            state.headerDetails.data = action.payload;
        })
        .addCase(fetchHeaderDetails.rejected, (state, action) => {
            state.headerDetails.status = "error";
            state.headerDetails.error = action.error;
        })
        .addCase(fetchVideoDetails.pending, (state) => {
            state.videoDetails.status = "loading";
        })
        .addCase(fetchVideoDetails.fulfilled, (state, action) => {
            state.videoDetails.status = "success";
            state.videoDetails.data = action.payload;
        })
        .addCase(fetchVideoDetails.rejected, (state, action) => {
            state.videoDetails.status = "error";
            state.videoDetails.error = action.error;
        })
    }
})

export const {searchQuery} = commonSlice.actions;

export const selectQueryString = (state) => state.common.queryString;
export const selectHeaderDetails = (state) => state.common.headerDetails;
export const selectVideoDetails = (state) => state.common.videoDetails;
export default commonSlice.reducer;