import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { driverService } from "services/driverService";
import Swal from "sweetalert2";
import { Driver } from "models/Driver";
import { useNavigate } from "react-router-dom";

const ListOrders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Driver[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orders = await driverService.getDrivers()
    setData(orders);
  };

  const handleCreation = () =>{
    navigate("form")
  }

  const handleEdit = (order_id: number) => {
    console.log(`Editar drivero con ID: ${order_id}`);
    navigate(`/admin/drivers/form/${order_id}`)
  };

  const handleDelete = async (order_id: number) => {
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
        const success = await driverService.deleteDriver(order_id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "El driver se ha eliminado",
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
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID driver</th>
                    <th scope="col" className="px-6 py-3">Nombre</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Licencia</th>
                    <th scope="col" className="px-6 py-3">Teléfono</th>
                    <th scope="col" className="px-6 py-3">Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4">{item.id}</td>
                      <td className="px-6 py-4">{item.name }</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.license_number}</td>
                      <td className="px-6 py-4">{item.phone}</td>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4 space-x-2">
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