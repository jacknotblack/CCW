import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import { fetchAssetDetail, resetAssetDetail } from "../slices/nft";
import { useNFTAssetDetail } from "../app/hooks";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const DetailHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
`;

const CollectionName = styled.div`
  margin: 0 auto;
`;

const GoBackButton = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  align-items: center;
  > img {
    width: 100%;
  }
`;

const Detail = () => {
  const dispatch = useDispatch();
  const { tokenId, contractAddress } = useParams();

  useEffect(() => {
    dispatch(fetchAssetDetail({ tokenId, contractAddress }));
    return () => {
      dispatch(resetAssetDetail());
    };
  }, [dispatch, tokenId, contractAddress]);

  const navigate = useNavigate();
  const goBackButtonClickHandler = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const { assetDetail, isLoading } = useNFTAssetDetail();

  const permalinkClickHandler = useCallback(() => {
    if (assetDetail && assetDetail.permalink)
      window.location.href = assetDetail.permalink;
  }, [assetDetail]);

  if (isLoading || assetDetail === null) return <div>loading...</div>;

  const {
    collection: { name: collectionName },
    image_url: imgSrc,
    name,
    description,
  } = assetDetail;

  return (
    <DetailContainer>
      <DetailHeader>
        <GoBackButton onClick={goBackButtonClickHandler}>{"<"}</GoBackButton>
        <CollectionName>{collectionName}</CollectionName>
      </DetailHeader>
      <DetailWrapper>
        <img src={imgSrc} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
        <button onClick={permalinkClickHandler}>permalink</button>
      </DetailWrapper>
    </DetailContainer>
  );
};

export default Detail;
