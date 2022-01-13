import nftSliceReducer, {
  setAccountInitialized,
  setAccount,
  fetchAssets,
  updateAssets,
  resetAssets,
  fetchAssetDetail,
  updateAssetDetail,
  resetAssetDetail,
} from './nftSlice';

describe('counter reducer', () => {
  const initialState = {
    isAccountInitialized: false,
    account: null,
    assets: [],
    isAssetsLoading: false,
    hasMore: true,
    assetDetail: null,
    isAssetDetailLoading: false,
    offset: 0,
  };
  it('should handle initial state', () => {
    expect(nftSliceReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setAccountInitialized', () => {
    const actual = nftSliceReducer(initialState, setAccountInitialized(true));
    expect(actual.isAccountInitialized).toBe(true);
  });

  it('should handle setAccount', () => {
    const actual = nftSliceReducer(initialState, setAccount('my account'));
    expect(actual.account).toBe('my account');
  });

  it('should handle fetchAssets', () => {
    const actual = nftSliceReducer(initialState, fetchAssets());
    expect(actual.isAssetsLoading).toBe(true);
  });

  // TODO: finish all tests
});
