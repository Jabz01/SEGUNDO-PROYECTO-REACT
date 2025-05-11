import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Restaurant } from "models/Restaurant";
import { restaurantService } from "services/restaurantService";
import RestaurantForm from "./RestaurantForm";

const RestaurantEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await restaurantService.getRestaurantByID(Number(id));
        setRestaurant(data);
      } catch (error) {
        console.error("Error al cargar restaurante:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Cargando restaurante...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700">Editar Restaurante</h2>
      {restaurant ? <RestaurantForm restaurant={restaurant} /> : <p className="text-red-500">No se encontró el restaurante.</p>}
    </div>
  );
};

export default RestaurantEdit;