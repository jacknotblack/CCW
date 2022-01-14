import nftReducer, {
  setAccount,
  fetchAssets,
  updateAssets,
  resetAssets,
  fetchAssetDetail,
  updateAssetDetail,
  resetAssetDetail,
} from "./nftSlice";
import { fetchAssetsEpic, fetchAssetEpic } from "./nftEpics";

// Reducer
export { nftReducer };
  
// Action Creator
export {
  setAccount,
  fetchAssets,
  updateAssets,
  resetAssets,
  fetchAssetDetail,
  updateAssetDetail,
  resetAssetDetail,
};
  
// Epic
export { fetchAssetsEpic, fetchAssetEpic };
