import { ajax } from "rxjs/ajax";
import { mergeMap, map } from "rxjs/operators";
import { ofType } from "redux-observable";
import { updateAssets, updateAssetDetail } from "./nftSlice";

import { NFT_AMOUNT_PER_FETCH } from "./constants";

// GET
// EndPoint: https://api.opensea.io/api/v1/assets
// Parameters:
// format=json
// owner
// offset
// limit

export const fetchAssetsEpic = (action$, state$) => {

  const params = new URLSearchParams();
  params.set("limit", NFT_AMOUNT_PER_FETCH);
  params.set("format", "json");
  return action$.pipe(
    ofType("nft/fetchAssets"),
    mergeMap(() =>
      ajax
        .getJSON(
          `https://api.opensea.io/api/v1/assets?${params.toString()}&offset=${
            state$.value.nft.offset
          }&owner=${state$.value.nft.account}`
        )
        .pipe(map((response) => updateAssets(response.assets)))
        // TODO: handle exception
    )
  );
};

// GET
// https://api.opensea.io/api/v1/asset/[contract_address]/[token_id]

export const fetchAssetEpic = (action$) => {
  return action$.pipe(
    ofType("nft/fetchAssetDetail"),
    mergeMap(({ payload: { tokenId, contractAddress } }) =>
      ajax
        .getJSON(
          `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}`
        )
        .pipe(map((response) => updateAssetDetail(response)))
        // TODO: handle exception
    )
  );
};
