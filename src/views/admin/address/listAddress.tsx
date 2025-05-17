import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Address } from "models/Address";
import { addressService } from "services/addressService";

const ListAddress = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Address[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const addresses = await addressService.getAddress();
    setData(addresses);
  };

  const handleView = (id: number) => {
    console.log(`Ver dirección con ID: ${id}`);
    navigate(`/admin/address/view/${id}`)
  };


  const handleEdit = (id: number) => {
    console.log(`Editar dirección con ID: ${id}`);
    navigate(`/admin/addresses/update/${id}`);
  };

  const handleDelete = async (id: number) => {
    console.log(`Intentando eliminar dirección con ID: ${id}`);
    Swal.fire({
      title: "Eliminación",
      text: "¿Está seguro de querer eliminar esta dirección?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await addressService.deleteAddress(id);
        if (success) {
          Swal.fire("Eliminado", "La dirección se ha eliminado.", "success");
        }
        fetchData();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Direcciones registradas
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">ID Pedido</th>
                    <th className="px-6 py-3">Calle</th>
                    <th className="px-6 py-3">Ciudad</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Código Postal</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.id}</td>
                      <td className="px-6 py-4">{item.order_id}</td>
                      <td className="px-6 py-4">{item.street}</td>
                      <td className="px-6 py-4">{item.city}</td>
                      <td className="px-6 py-4">{item.state}</td>
                      <td className="px-6 py-4">{item.postal_code}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleView(item.id ?? 0)}
                          className="text-blue-600 dark:text-blue-500"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => item.id !== undefined && handleEdit(item.id)}
                          className="text-yellow-600 dark:text-yellow-500"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => item.id !== undefined && handleDelete(item.id)}
                          className="text-red-600 dark:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAddress;
