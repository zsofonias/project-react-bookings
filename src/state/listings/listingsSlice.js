import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/api';

const initialState = {
  listings: [],
  favoriteListingIds: [],
  status: 'idle',
  error: null,
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addFavoriteListing: (state, action) => {
      state.favoriteListingIds.push(action.payload);
    },
    removeFavoriteListing: (state, action) => {
      state.favoriteListingIds = state.favoriteListingIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        (state.status = 'succeeded'), (state.listings = action.payload);
      })
      .addCase(fetchListings.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }
        (state.status = 'failed'), (state.error = action.payload.message);
      });
  },
});

export const { addFavoriteListing, removeFavoriteListing } =
  listingsSlice.actions;

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (options) => {
    const response = await api.get('/api/listings', options);
    return response.data;
  },
);

export default listingsSlice.reducer;
