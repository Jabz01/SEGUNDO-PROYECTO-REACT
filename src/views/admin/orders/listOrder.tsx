import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { orderService } from "services/orderService";
import Swal from "sweetalert2";
import { Order } from "models/Order";
import { useNavigate } from "react-router-dom";

const ListOrders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orders = await orderService.getOrders()
    setData(orders);
  };

  const handleView = (id: number) => {
    console.log(`Ver Order con ID: ${id}`);

  };

  const handleCreation = () =>{
    navigate("create")
  }

  const handleEdit = (order_id: number) => {
    console.log(`Editar pedido con ID: ${order_id}`);
    navigate(`/admin/orders/update/${order_id}`)
  };

  const handleDelete = async (order_id: number) => {
    console.log(`Intentando eliminar usuario con ID: ${order_id}`);
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro de querer eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await orderService.deleteOrder(order_id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "El pedido se ha eliminado",
            icon: "success"
          });
        }
        // 🔹 Vuelve a obtener los usuarios después de eliminar uno
        fetchData();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Pedidos pendientes
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID orden</th>
                    <th scope="col" className="px-6 py-3">ID menu</th>
                    <th scope="col" className="px-6 py-3">ID motocicleta</th>
                    <th scope="col" className="px-6 py-3">ID cliente</th>
                    <th scope="col" className="px-6 py-3">Cantidad</th>
                    <th scope="col" className="px-6 py-3">Precio Total</th>
                    <th scope="col" className="px-6 py-3">Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.menu_id}</td>
                      <td className="px-6 py-4">{item.motorcycle_id}</td>
                      <td className="px-6 py-4">{item.customer_id }</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">{item.total_price}</td>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleView(item.id ? item.id : 0)}
                          className="text-blue-600 dark:text-blue-500"
                        >
                          <Eye size={20} /> {/* Ícono de ver */}
                        </button>
                        <button
                          onClick={() => item.id !== undefined && handleEdit(item.id)}
                          className="text-yellow-600 dark:text-yellow-500"
                        >
                          <Edit size={20} /> {/* Ícono de editar */}
                        </button>
                        <button
                          onClick={() => item.id !== undefined && handleDelete(item.id)}
                          className="text-red-600 dark:text-red-500"
                        >
                          <Trash2 size={20} /> {/* Ícono de eliminar */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => handleCreation()}
                className={"m-2 py-2 px-4 text-white rounded-md bg-blue-500 hover:bg-blue-600"}
              >
                <Plus size={20} /> {/* Ícono de crear */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};


export default ListOrders;

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
