// import MiniCalendar from "components/calendar/MiniCalendar";
// import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
// import TotalSpent from "views/admin/default/components/TotalSpent";
// import PieChartCard from "views/admin/default/components/PieChartCard";
// import { IoMdHome } from "react-icons/io";
// import { IoDocuments } from "react-icons/io5";
// import { MdBarChart, MdDashboard } from "react-icons/md";

// import Widget from "components/widget/Widget";
// import CheckTable from "views/admin/default/components/CheckTable";
// import ComplexTable from "views/admin/default/components/ComplexTable";
// import DailyTraffic from "views/admin/default/components/DailyTraffic";
// import TaskCard from "views/admin/default/components/TaskCard";
// import tableDataCheck from "./variables/tableDataCheck";
// import tableDataComplex from "./variables/tableDataComplex";
// import { useContext } from "react";

import { restaurantService } from "services/restaurantService";

import { AuthContext, useAuth } from "context/AuthProvider";
import { useEffect, useState } from "react";
import { menuService } from "services/menuService";

import { MdAddLocationAlt, MdAddShoppingCart, MdLocalPhone, MdModeEditOutline } from "react-icons/md";

import image1 from "assets/img/profile/equis.jpg";
import { Restaurant } from "models/Restaurant";

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [menus, setMenus] = useState(null);
  const { user, isLoggedIn } = useAuth();

  const fetchData = async () => {
    setRestaurants(await restaurantService.getRestaurants());

    let menuData = (Object as any).groupBy(
      await menuService.getMenus(),
      (e: any) => e.restaurant.id);

    Object.keys(menuData).forEach((key) => {
      menuData[key] = menuData[key].map((e: any) => ({
        product_id: e.product.id,
        product_name: e.product.name,
        price: e.product.price,
        description: e.product.description,
        availability: e.availability
      }))
    });

    setMenus(window.structuredClone(menuData));

    console.log(menus);

  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeeMenu = async (id: any) => {
    console.log("eee:", id);
    
  }

  return (
    <div className="mt-5" >
      <div>
        {restaurants.map((item) => (
          <div key={item.id} className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <div className="flex items-center">
              <div className="">
                <img className="h-[83px] w-[83px] rounded-lg" src={image1} alt="" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {item.name}
                </p>
                <p className="mt-2 text-sm text-gray-600 flex flex-row items-center gap-1">
                  <MdAddLocationAlt /> {item.address}
                  <a
                    className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white  flex flex-row items-center"
                    href=" "
                  >
                    <MdLocalPhone /> {item.phone}
                  </a>
                </p>
              </div>
            </div>
            <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
              <button
                          onClick={() => item.id !== undefined && handleSeeMenu(item.id)}
                          className=""
                        >
                          <MdAddShoppingCart /> {/* Ícono de eliminar */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**


<div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
<Widget
  icon={<MdBarChart className="h-7 w-7" />}
  title={"Earnings"}
  subtitle={"$340.5"}
/>
<Widget
  icon={<IoDocuments className="h-6 w-6" />}
  title={"Spend this month"}
  subtitle={"$642.39"}
/>
<Widget
  icon={<MdBarChart className="h-7 w-7" />}
  title={"Sales"}
  subtitle={"$574.34"}
/>
<Widget
  icon={<MdDashboard className="h-6 w-6" />}
  title={"Your Balance"}
  subtitle={"$1,000"}
/>
<Widget
  icon={<MdBarChart className="h-7 w-7" />}
  title={"New Tasks"}
  subtitle={"145"}
/>
<Widget
  icon={<IoMdHome className="h-6 w-6" />}
  title={"Total Projects"}
  subtitle={"$2433"}
/>
</div>


<div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
<TotalSpent />
<WeeklyRevenue />
</div>


<div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
<div>
  <CheckTable tableData={tableDataCheck} />
</div>


<div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
  <DailyTraffic />
  <PieChartCard />
</div>


<ComplexTable tableData={tableDataComplex} />


<div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
  <TaskCard />
  <div className="grid grid-cols-1 rounded-[20px]">
    <MiniCalendar />
  </div>
</div>
</div>

 */

export default Dashboard;
