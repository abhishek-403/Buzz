import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosSetup";

export const getmyProfile = createAsyncThunk(
  "post/getUserprofile",
  async (_) => {
    try {
      const response = await axiosClient.get("/user/getmyprofile");

      return response.result;
    } catch (e) {
      console.log("profileslice", e);
      return Promise.reject(e);
    }
  }
);

export const getFeedData = createAsyncThunk(
  "/user/getmyfeed",

  async (_, thunkAPI) => {
    try {
      const { feedData } = thunkAPI.getState();
      if (feedData?.length == 0) {
        thunkAPI.dispatch(setLoader(true));
      }

      const response = await axiosClient.get("/user/getmyfeed");
      console.log("myfeed");

      return response.result.newData;
    } catch (e) {
      console.log("feedslice", e);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoader(false));
    }
  }
);

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    isLoading: true,
    myProfile: {},
    feedData: [],
    toastData: {},
  },
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
    feedLength: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getmyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload.reverse();
      });
  },
});

export default appConfigSlice.reducer;
export const { setLoader, showToast } = appConfigSlice.actions;
