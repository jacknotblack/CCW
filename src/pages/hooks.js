import { useSelector, shallowEqual } from "react-redux";

const useShallowEqualSelector = (selector) => {
  return useSelector(selector, shallowEqual);
};

export const useAccountReady = () => {
  const isAccountReady = useShallowEqualSelector((state) => state.nft.isAccountReady);
  return { isAccountReady };
};

export const useNFTAssets = () => {
  const assets = useShallowEqualSelector((state) => state.nft.assets);

  const isLoading = useShallowEqualSelector(
    (state) => state.nft.isAssetsLoading
  );
  const hasMore = useShallowEqualSelector((state) => state.nft.hasMore);
  return { assets, isLoading, hasMore };
};

export const useNFTAssetDetail = () => {
  const assetDetail = useShallowEqualSelector((state) => state.nft.assetDetail);
  const isLoading = useShallowEqualSelector(
    (state) => state.nft.isAssetDetailLoading
  );
  return { assetDetail, isLoading };
};
