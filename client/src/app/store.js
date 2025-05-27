import { configureStore } from "@reduxjs/toolkit";
import scraperReducer from "../features/scraperSlice";

export default configureStore({
  reducer: {
    scraper: scraperReducer,
  },
});
