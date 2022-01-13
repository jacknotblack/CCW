import List from "../pages/list";
import Detail from "../pages/detail";

// TODO: Add lazy load of components to fulfill code splitting
// const MyComponent = lazy(() =>
//   import(/* webpackChunkName: "MyComponentName" */ 'import path of MYComponent')
// );

const routes = [
  {
    name: "NFT list",
    path: "/list",
    component: List,
    exact: true,
  },
  {
    name: "NFT detail",
    path: "/detail/:contractAddress/:tokenId",
    component: Detail,
    exact: true,
  },
];

export default routes;
