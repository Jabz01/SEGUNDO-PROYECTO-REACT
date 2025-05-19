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
  MdPedalBike,
  MdRestaurant,
  MdAddBusiness,
  MdEdit,
  MdCheckroom,
  MdEmergencyRecording,
  MdEmergency,
  MdDirections,
  MdPhoto,
  MdInfo,
  MdAddCircle,
  MdEventAvailable
} from "react-icons/md";

import Products from "views/admin/products/listProducts";
import Orders from "views/admin/orders/listOrder";
import Drivers from "views/admin/drivers/listDrivers";
import Motorcycles from "views/admin/motorcycles/listMotorcycle";

import App from "views/admin/orders/createOrder";
import UpdateOrder from "views/admin/orders/uptadeOrder";


import FormProducts from "views/admin/products/formProducts";
import FormDrivers from "views/admin/drivers/formDrivers";
import FormMotorcycles from "views/admin/motorcycles/formMotorcycles";
import CreateAddress from "views/admin/address/createAddress";

import RestaurantList from "views/admin/restaurants/RestaurantList";
import RestaurantForm from "views/admin/restaurants/RestaurantForm";
import RestaurantEdit from "views/admin/restaurants/RestaurantEdit";
import UpdateIssue from "views/admin/issue/updateIssue";
import ListIssues from "views/admin/issue/listIssue";
import CreateIssue from "views/admin/issue/createIssue";
import CreatePhoto from "views/admin/photo/createPhoto";
import UpdateAddress from "views/admin/address/updateAddress";
import ViewAddress from "views/admin/address/viewAddres";
import ListAddress from "views/admin/address/listAddress";
import PhotoUpdate from "views/admin/photo/updatePhoto";
import ListPhotos from "views/admin/photo/listPhoto";

import CustomersList from "views/admin/customers/CustomerList";
import CustomerForm from "views/admin/customers/CustomerForm";
import CustomerEdit from "views/admin/customers/CustomerEdit";
import MenuView from "views/admin/default/menu";
import TrackingView from "views/admin/map/orderTracking";
import PieCharts from "views/admin/graphics/pieCharts";
import ShiftEdit from "views/admin/shifts/ShiftEdit";
import ShiftForm from "views/admin/shifts/ShiftForm";
import ShiftList from "views/admin/shifts/ShiftList";



const routes = [
  {
    name: "Explorar Restaurantes",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Menú",
    layout: "/admin",
    path: "default/menu/:id",
    icon: <MdHome className="h-6 w-6" />,
    component: <MenuView />,
    sidebarUnlisted: true
  },
  {
    name: "Pedidos",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineMoped className="h-6 w-6" />,
    component: <Orders />,
  },
  {
    name: "Crear pedidos",
    layout: "/admin",
    path: "orders/create",
    icon: <MdHome className="h-6 w-6" />,
    component: <App />,
    sidebarUnlisted: true
  },

  {
    name: "Editar pedidos",
    layout: "/admin",
    path: "orders/update/:id",
    icon: <MdHome className="h-6 w-6" />,
    component: <UpdateOrder />,
    sidebarUnlisted: true
  },

  {
    name: "Rastrear pediod",
    layout: "/admin",
    path: "orders/track/:id",
    icon: <MdHome className="h-6 w-6" />,
    component: <TrackingView />,
    sidebarUnlisted: true
  },

  {
    name: "direcciones",
    layout: "/admin",
    path: "address",
    icon: <MdDirections className="h-6 w-6" />,
    component: <ListAddress />,
  },

  {
    name: "Registrar dirección",
    layout: "/admin",
    path: "orders/create/address/:order_id",
    icon: <MdHome className="h-6 w-6" />,
    component: <CreateAddress />,
    sidebarUnlisted: true
  },

  {
    name: "Actualizar dirección",
    layout: "/admin",
    path: "address/update/:id",
    icon: <MdHome className="h-6 w-6" />,
    component: <UpdateAddress />,
    sidebarUnlisted: true
  },

  {
    name: "Detalles dirección",
    layout: "/admin",
    path: "address/view/:id",
    icon: <MdHome className="h-6 w-6" />,
    component: <ViewAddress />,
    sidebarUnlisted: true
  },

  {
    name: "Problemas",
    layout: "/admin",
    path: "issues",
    icon: <MdEmergency className="h-6 w-6" />,
    component: <ListIssues />,
  },

  {
    name: "Reportar problemas",
    layout: "/admin",
    path: "issues/report",
    icon: <MdHome className="h-6 w-6" />,
    component: <CreateIssue />,
    sidebarUnlisted: true
  },

  {
    name: "Actualizar estados de problemas",
    layout: "/admin",
    path: "/issues/update/:id",
    icon: <MdHome className="h-6 w-6" />,
    component: <UpdateIssue />,
    sidebarUnlisted: true
  },

  {
    name: "Ver evidencia",
    layout: "/admin",
    path: "photos",
    icon: <MdPhoto className="h-6 w-6" />,
    component: <ListPhotos />,
  },

  {
    name: "Subir evidencia",
    layout: "/admin",
    path: "issues/photo/:issue_id",
    icon: <MdHome className="h-6 w-6" />,
    component: <CreatePhoto />,
    sidebarUnlisted: true
  },

  {
    name: "Actualizar evidencia",
    layout: "/admin",
    path: "photos/update/:id",
    icon: <MdHome className="h-6 w-6" />,
    component: <PhotoUpdate />,
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
    name: "Conductores",
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
    name: "Perfil",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    sidebarUnlisted: true

  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    sidebarUnlisted: true
  },
  {
    name: "Restaurantes",
    layout: "/admin",
    path: "restaurants",
    icon: <MdRestaurant className="h-6 w-6" />,
    component: <RestaurantList />,
  },
  {
    name: "Create Restaurant",
    layout: "/admin",
    path: "restaurants/create",
    icon: <MdAddBusiness className="h-6 w-6" />,
    component: <RestaurantForm />,
    sidebarUnlisted: true,
  },
  {
    name: "Edit Restaurant",
    layout: "/admin",
    path: "restaurants/edit/:id",
    icon: <MdEdit className="h-6 w-6" />,
    component: <RestaurantEdit />,
    sidebarUnlisted: true,
  },
  {
    name: "Lista de Clientes",
    layout: "/admin",
    path: "customers",
    icon: <MdPerson className="h-6 w-6" />,
    component: <CustomersList />,
  },
  {
    name: "Create Customer",
    layout: "/admin",
    path: "customers/new",
    icon: <MdAddBusiness className="h-6 w-6" />,
    component: <CustomerForm />,
    sidebarUnlisted: true,
  },
  {
    name: "Edit Customer",
    layout: "/admin",
    path: "customers/edit/:id",
    icon: <MdEdit className="h-6 w-6" />,
    component: <CustomerEdit />,
    sidebarUnlisted: true,
  },
  {
    name: "Lista de Turnos",
    layout: "/admin",
    path: "shifts",
    icon: <MdEventAvailable className="h-6 w-6" />,
    component: <ShiftList />,
  },
  {
    name: "Crear Turno",
    layout: "/admin",
    path: "shifts/create",
    icon: <MdAddCircle className="h-6 w-6" />,
    component: <ShiftForm />,
    sidebarUnlisted: true,
  },
  {
    name: "Editar Turno",
    layout: "/admin",
    path: "shifts/edit/:id",
    icon: <MdEdit className="h-6 w-6" />,
    component: <ShiftEdit />,
    sidebarUnlisted: true,
  },


  {
    name: "Ver graficos",
    layout: "/admin",
    path: "graphics",
    icon: <MdInfo className="h-6 w-6" />,
    component: <PieCharts />,
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
