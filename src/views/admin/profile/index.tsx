import { useEffect, useState } from "react";
import { useAuth } from "context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { customerService } from "services/customerService";
import { Customer } from "models/Customer";

const ProfileCard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  // 🔹 Obtener avatar desde localStorage
  const localUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : {};

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersList = await customerService.getCustomers();
        setCustomers(customersList || []);

        // 🔹 Buscar el cliente cuyo nombre coincide con el usuario actual
        const matchedCustomer = customersList?.find(
          customer => customer.name.toLowerCase() === localUser.name?.toLowerCase()
        );

        if (matchedCustomer) {
          setCurrentCustomer({
            ...matchedCustomer, // 🔹 Datos del backend
          });
        }
      } catch (error) {
        console.error("Error obteniendo clientes:", error);
      }
    };

    fetchCustomers();
  }, []);

  // 🔹 Convertir `id` a número solo al usarlo en la navegación
  const handleEditProfile = () => {
    if (currentCustomer) {
      navigate(`/admin/customers/edit/${Number(currentCustomer.id)}`);
    }
  };

  return (
    <div className="max-w-sm h-[60vh] mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6 dark:bg-gray-800">
      {/* Imagen desde localStorage */}
      <div className="flex justify-center">
        <img
          src={localUser.avatar || "default-avatar.png"} // 🔹 Avatar obtenido de `localStorage`
          alt={currentCustomer?.name || "Usuario"}
          className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Información del usuario */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white lg:text-2xl">
          {currentCustomer?.name || "Usuario"}
        </h2>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg">
          {currentCustomer?.email || "Correo no registrado"}
        </p>
        <p className="text-gray-500 dark:text-gray-300 lg:text-lg">
          {currentCustomer?.phone || "Teléfono no disponible"}
        </p>
      </div>

      {/* Botón para editar perfil */}
      <div className="mt-6 flex justify-center">
        <button 
          onClick={handleEditProfile} 
          className="w-1/3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 lg:text-lg"
          disabled={!currentCustomer}
        >
          Editar Perfil
        </button>
      </div>

      {/* Botón para cerrar sesión */}
      <div className="mt-6 flex justify-center">
        <button 
          onClick={logout} 
          className="w-1/3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 lg:text-lg"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;