import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";
import { Outlet } from "react-router-dom";

import { setAccount, setAccountReady } from "./slices/nft";

function App() {
  const dispatch = useDispatch();

  const connectToMetaMask = useCallback(async () => {
    let account = "0x960DE9907A2e2f5363646d48D7FB675Cd2892e91";
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum
          .request({ method: "eth_requestAccounts" });

        // Workaround to get account from metaMask after request
        while (true) {
          console.count('while')
          try {
            const accounts = await window.ethereum.request({
              method: "eth_accounts",
            });
            if (accounts.length > 0) {
              account = web3.currentProvider.selectedAddress;
              break;
            }
          } catch (e) {
            console.log(e);
            // TODO: handle exception
          }
        }
      } catch (e) { 
         // user reject to connect
            console.log(e);
            dispatch(setAccount(account));
            dispatch(setAccountReady(true));
      }
    }

    dispatch(setAccount(account));
    dispatch(setAccountReady(true));
  }, [dispatch]);

  useEffect(() => {
    connectToMetaMask();
  }, [connectToMetaMask]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
