import { useEffect, useState } from "react";
import { Customer } from "models/Customer";
import { customerService } from "services/customerService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Edit, Trash2, Plus } from "lucide-react";
import { number } from "yup";

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Obtener el usuario actual desde localStorage
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customerService.getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
     const idNumber = parseInt(id, 10);
    console.log("Este es el id que quieres eliminar: " + idNumber)
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar este cliente después de eliminarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await customerService.deleteCustomer(idNumber);
        setCustomers(customers.filter((c) => c.name !== currentUser.name));
        Swal.fire("Eliminado", "El cliente ha sido eliminado.", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el cliente.", "error");
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando clientes...</p>;

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm bg-white shadow-md dark:bg-boxdark">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-700">Lista de Clientes</h2>

            {/* Mostrar mensaje si hay dos clientes registrados */}
            {customers.length >= 2 ? (
              <p className="my-4 p-4 bg-red-500 text-white rounded-md text-center">
                Solo se pueden registrar dos clientes. No puedes agregar más.
              </p>
            ) : (
              <button
                onClick={() => navigate("/admin/customers/new")}
                className="my-4 py-2 px-4 flex items-center bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                <Plus size={20} className="mr-2" /> Agregar Cliente
              </button>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Teléfono</th>
                    <th className="px-6 py-3">Correo</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.name} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-6 py-4">{customer.name}</td>
                      <td className="px-6 py-4">{customer.phone}</td>
                      <td className="px-6 py-4">{customer.email}</td>
                      <td className="px-6 py-4 flex space-x-2">
                        {/* Mostrar botón de edición solo si el nombre coincide */}
                        {currentUser.name === customer.name && (
                          <button
                            onClick={() => navigate(`/admin/customers/edit/${customer.name}`)}
                            className="text-yellow-600 dark:text-yellow-500"
                          >
                            <Edit size={20} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(customer.id)}
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

export default CustomerList;