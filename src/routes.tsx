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
  MdInbox,
  MdOutlineMoped,
  MdDirectionsBike,
  MdPedalBike
} from "react-icons/md";

import Products from "views/admin/products/listProducts";
import Orders from "views/admin/orders/listOrder";
import Drivers from "views/admin/drivers/listDrivers";
import Motorcycles from "views/admin/motorcycles/listMotorcycle";

import App from "views/admin/orders/createOrder";
import UpdateOrder from "views/admin/orders/uptadeOrder";
import UpdateAddress from "views/admin/address/updateAddress";
import CreateAddress from "views/admin/address/createAddress";

import FormProducts from "views/admin/products/formProducts";
import FormDrivers from "views/admin/drivers/formDrivers";
import FormMotorcycles from "views/admin/motorcycles/formMotorcycles";

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
    icon: <MdOutlineMoped className="h-6 w-6" />,
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
    name: "Address",
    layout: "/admin",
    path: "orders/create/address",
    icon: <MdHome className="h-6 w-6" />,
    component: <CreateAddress />,
    sidebarUnlisted: true
  },

  {
    name: "Edit Address",
    layout: "/admin",
    path: "orders/address/update/:id",
    icon: <MdHome className="h-6 w-6" />,
    component: <UpdateAddress />,
    sidebarUnlisted: true
  },

  {
    name: "Productos",
    layout: "/admin",
    path: "products",
    icon: <MdInbox className="h-6 w-6" />,
    component: <Products />,
  },
  {
    name: "Products form",
    layout: "/admin",
    path: "products/form/:id?",
    icon: <MdInbox className="h-6 w-6" />,
    component: <FormProducts />,
    sidebarUnlisted: true
  },

  {
    name: "Drivers",
    layout: "/admin",
    path: "drivers",
    icon: <MdDirectionsBike className="h-6 w-6" />,
    component: <Drivers />,
  },
  {
    name: "Drivers form",
    layout: "/admin",
    path: "drivers/form/:id?",
    icon: <MdDirectionsBike className="h-6 w-6" />,
    component: <FormDrivers />,
    sidebarUnlisted: true
  },

  {
    name: "Motos",
    layout: "/admin",
    path: "motorcycles",
    icon: <MdPedalBike className="h-6 w-6" />,
    component: <Motorcycles />,
  },

  {
    name: "Motos",
    layout: "/admin",
    path: "motorcycles/form/:id?",
    icon: <MdPedalBike className="h-6 w-6" />,
    component: <FormMotorcycles />,
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
