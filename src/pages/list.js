import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { fetchAssets, resetAssets } from "../slices/nft";
import { useNFTAssets, useAccountReady } from "./hooks";
import NFTCard from "./NFTcard";

const AssetListTitle = styled.h3`
  text-align: center;
`;

const AssetListContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  box-sizing: border-box;
  flex-wrap: wrap;
  column-gap: 2%;
  row-gap: 10px;
  min-height: 100vh;
`;

const List = () => {
  const dispatch = useDispatch();

  const { isAccountReady } = useAccountReady();

  // initial fetch on mount and reset on unmount
  // pending until account is ready 
  useEffect(() => {
    if (!isAccountReady) {
      return;
    }
    dispatch(fetchAssets());
    return () => {
      dispatch(resetAssets());
    };
  }, [dispatch, isAccountReady]);

  const { assets, isLoading, hasMore } = useNFTAssets();

  const shouldDisplayLoadMore = useMemo(
    () => !isLoading && assets.length > 0 && hasMore,
    [isLoading, assets.length, hasMore]
  );

  // setup observer for infinite scroll
  // trigger next fetch when loader intersect with (100+6)% of viewport
  const observer = useRef();
  const loaderRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            dispatch(fetchAssets());
          }
        },
        { rootMargin: "0px 0px 6% 0px" }
      );
      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading, dispatch]
  );

  return (
    <div>
      <AssetListTitle>LIST</AssetListTitle>
      <AssetListContainer>
        {assets.map(
          ({ id, name, image_url, token_id, asset_contract: { address } }) => (
            <NFTCard
              key={id}
              name={name}
              imgSrc={image_url}
              tokenId={token_id}
              contractAddress={address}
            />
          )
        )}
      </AssetListContainer>
      {shouldDisplayLoadMore && <span ref={loaderRef}>loading more...</span>}
    </div>
  );
};

export default List;
