import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import Orders from "views/admin/orders/listOrder";
import App from "views/admin/orders/createOrder";
import UpdateOrder from "views/admin/orders/uptadeOrder";

const routes = [
  {
    name: "Explore restaurants",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdHome className="h-6 w-6" />,
    component: <Orders />,
  },
  {
    name: "Create Orders",
    layout: "/admin",
    path: "orders/create",
    icon: <MdHome className="h-6 w-6" />,
    component: <App />,
    sidebarUnlisted: true
  },
    {
    name: "Edit Orders",
    layout: "/admin",
    path: "orders/update/:id",
    icon: <MdHome className="h-6 w-6" />,
    component: <UpdateOrder />,
    sidebarUnlisted: true
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    sidebarUnlisted: true
  },
  
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
];
export default routes;
