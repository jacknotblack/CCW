import { createSlice } from "@reduxjs/toolkit";
import { NFT_AMOUNT_PER_FETCH, DEFAULＴ_ACCOUNT_ADDRESS } from "./constants";

const initialState = {
  account: null,
  assets: [],
  isAssetsLoading: false,
  hasMore: true,
  assetDetail: null,
  isAssetDetailLoading: false,
  offset: 0,
};

export const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    setAccount: (state, action) => { 
      state.account = action.payload || DEFAULＴ_ACCOUNT_ADDRESS;
    },
    /**
     * Assets list reducers
     */
    

    fetchAssets: (state) => {
      state.isAssetsLoading = true;
    },
    updateAssets: (state, action) => {
      state.assets = state.assets.concat(action.payload);
      state.offset += NFT_AMOUNT_PER_FETCH;
      state.isAssetsLoading = false;
      if (action.payload.length < NFT_AMOUNT_PER_FETCH) {
        state.hasMore = false;
      }
    },
    resetAssets: (state) => {
      state.assets = initialState.assets;
      state.offset = initialState.offset;
    },

    /**
     * Asset detail reducers
     */

    fetchAssetDetail: (state) => {
      state.isAssetDetailLoading = true;
    },
    updateAssetDetail: (state, action) => {
      state.assetDetail = action.payload;
      state.isAssetDetailLoading = false;
    },
    resetAssetDetail: (state) => {
      state.assetDetail = initialState.assetDetail;
    },
  },
});

export const {
  setAccount,
  fetchAssets,
  updateAssets,
  resetAssets,
  fetchAssetDetail,
  updateAssetDetail,
  resetAssetDetail,
} = nftSlice.actions;

export default nftSlice.reducer;
