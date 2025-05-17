import { useEffect, useState } from "react";
import { Restaurant } from "models/Restaurant";
import { restaurantService } from "services/restaurantService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Edit, Trash2, Plus } from "lucide-react"; 

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantService.getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Error al cargar restaurantes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este restaurante después de eliminarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await restaurantService.deleteRestaurant(id);
        setRestaurants(restaurants.filter((r) => r.id !== id));
        Swal.fire("Eliminado", "El restaurante ha sido eliminado.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el restaurante.", "error");
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando restaurantes...</p>;

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm bg-white shadow-md dark:bg-boxdark">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-700">Lista de Restaurantes</h2>
            <button
              onClick={() => navigate("/admin/restaurants/create")}
              className="my-4 py-2 px-4 flex items-center bg-blue-500 text-white rounded-md hover:bg-green-600"
            >
              <Plus size={20} className="mr-2" /> Crear Restaurante
            </button>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Dirección</th>
                    <th className="px-6 py-3">Teléfono</th>
                    <th className="px-6 py-3">Correo</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((restaurant) => (
                    <tr key={restaurant.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-6 py-4">{restaurant.id}</td>
                      <td className="px-6 py-4">{restaurant.name}</td>
                      <td className="px-6 py-4">{restaurant.address}</td>
                      <td className="px-6 py-4">{restaurant.phone}</td>
                      <td className="px-6 py-4">{restaurant.email}</td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/restaurants/edit/${restaurant.id}`)}
                          className="text-yellow-600 dark:text-yellow-500"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(restaurant.id!)}
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

export default RestaurantList;