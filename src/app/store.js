import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { nftReducer, fetchAssetsEpic, fetchAssetEpic } from '../slices/nft';

const rootEpic = combineEpics(
  fetchAssetsEpic,
  fetchAssetEpic
);
const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    nft: nftReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);
