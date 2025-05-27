// frontend/src/features/scraperSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const fetchImages = createAsyncThunk(
  "scraper/fetchImages",
  async (urls, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/scrape", { urls });
      return response.data.images;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const scraperSlice = createSlice({
  name: "scraper",
  initialState: {
    images: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearImages: (state) => {
      state.images = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = [...state.images, ...action.payload];
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || "Failed to fetch images";
      });
  },
});

export const { clearImages } = scraperSlice.actions;
export default scraperSlice.reducer;
