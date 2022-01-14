import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NFTCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 49%;
  cursor: pointer;
  > img {
    width: 100%;
  }
`;

const NFTCard = ({ name, imgSrc, tokenId, contractAddress }) => {
  const navigate = useNavigate();
  const clickHandler = useCallback(() => {
    navigate(`/detail/${contractAddress}/${tokenId}`);
  }, [navigate, contractAddress, tokenId]);

  return (
    <NFTCardContainer onClick={clickHandler}>
      <img src={imgSrc} alt={name} />
      {name}
    </NFTCardContainer>
  );
};

export default NFTCard;
