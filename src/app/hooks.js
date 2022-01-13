import { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Web3 from "web3";

import { setAccount } from "../slices/nft";

const useShallowEqualSelector = (selector) => {
  return useSelector(selector, shallowEqual);
};

//
// Account related hooks
//

export const useConnectToAccount = async () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const connectToAccount = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3 = new Web3(Web3.givenProvider);
          const accounts = await web3.eth.getAccounts();
          dispatch(setAccount(accounts[0]));
        } catch (err) {
          dispatch(setAccount());
        }
      }
    };
    connectToAccount();
  }, [dispatch]);
};


export const useAccountInitialized = () => {
  const isAccountInitialized = useShallowEqualSelector(
    (state) => state.nft.account !== null
  );
  return { isAccountInitialized };
};

//
// Assets related hooks
//

export const useNFTAssets = () => {
  const assets = useShallowEqualSelector((state) => state.nft.assets);

  const isLoading = useShallowEqualSelector(
    (state) => state.nft.isAssetsLoading
  );
  const hasMore = useShallowEqualSelector((state) => state.nft.hasMore);
  return { assets, isLoading, hasMore };
};

//
// Asset detail related hooks
//

export const useNFTAssetDetail = () => {
  const assetDetail = useShallowEqualSelector((state) => state.nft.assetDetail);
  const isLoading = useShallowEqualSelector(
    (state) => state.nft.isAssetDetailLoading
  );
  return { assetDetail, isLoading };
};
