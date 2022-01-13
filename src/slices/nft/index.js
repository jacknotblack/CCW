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

export { nftReducer };
export {
  setAccount,
  fetchAssets,
  updateAssets,
  resetAssets,
  fetchAssetDetail,
  updateAssetDetail,
  resetAssetDetail,
};
export { fetchAssetsEpic, fetchAssetEpic };
