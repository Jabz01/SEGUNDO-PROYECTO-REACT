import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { motorcycleService } from "services/motorcycleService";
import Swal from "sweetalert2";
import { Motorcycle } from "models/Motorcycle";
import { useNavigate } from "react-router-dom";

const ListMotorcycles = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Motorcycle[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const motorcycles = await motorcycleService.getMotorcycles()
    setData(motorcycles);
  };

  const handleCreation = () =>{
    navigate("form")
  }

  const handleEdit = (motorcycle_id: number) => {
    console.log(`Editar motorcycleo con ID: ${motorcycle_id}`);
    navigate(`/admin/motorcycles/form/${motorcycle_id}`)
  };

  const handleDelete = async (motorcycle_id: number) => {
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
        const success = await motorcycleService.deleteMotorcycle(motorcycle_id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "La moto se ha eliminado",
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
        <div className="rounded-sm bmotorcycle bmotorcycle-stroke bg-white shadow-default dark:bmotorcycle-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID moto</th>
                    <th scope="col" className="px-6 py-3">Licencia</th>
                    <th scope="col" className="px-6 py-3">Marca</th>
                    <th scope="col" className="px-6 py-3">Año</th>
                    <th scope="col" className="px-6 py-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 bmotorcycle-b dark:bmotorcycle-gray-700 bmotorcycle-gray-200">
                      <td className="px-6 py-4">{item.id}</td>
                      <td className="px-6 py-4">{item.license_plate }</td>
                      <td className="px-6 py-4">{item.brand}</td>
                      <td className="px-6 py-4">{item.year}</td>
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


export default ListMotorcycles;