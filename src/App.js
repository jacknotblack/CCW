import { Outlet } from "react-router-dom";

import { useConnectToAccount } from './app/hooks';

function App() {
  useConnectToAccount();
 
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
