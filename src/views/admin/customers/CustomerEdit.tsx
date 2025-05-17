import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Customer } from "models/Customer";
import { customerService } from "services/customerService";
import CustomerForm from "./CustomerForm";

const CustomerEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const idNumber = parseInt(id, 10);
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await customerService.getCustomerById(idNumber); 
        setCustomer(data);
      } catch (error) {
        console.error("Error al cargar cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Cargando cliente...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700">Editar Cliente</h2>
      {customer ? <CustomerForm customer={customer} /> : <p className="text-red-500">No se encontró el cliente.</p>}
    </div>
  );
};

export default CustomerEdit;