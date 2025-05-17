import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Customer } from "models/Customer";
import { customerService } from "services/customerService";
import { useNavigate } from "react-router-dom";

const CustomerForm = ({ customer }: { customer?: Customer }) => {
  const navigate = useNavigate();

  const initialValues: Customer = {
    id: customer?.id || "",
    name: customer?.name || "",
    phone: customer?.phone || "",
    email: customer?.email || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    phone: Yup.string()
      .matches(/^\d{7,10}$/, "El teléfono debe tener entre 7 y 10 dígitos")
      .required("El teléfono es obligatorio"),
    email: Yup.string().email("Correo inválido"),
  });

  const handleSubmit = async (values: Customer) => {
    try {
      let message = "";

      if (customer) {
        await customerService.updateCustomer(customer.id, values);
        message = "El cliente ha sido actualizado correctamente.";
      } else {
        await customerService.registerCustomer(values);
        message = "El cliente ha sido creado con éxito.";
      }

      await Swal.fire("Éxito", message, "success");
      navigate("/admin/customers");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Hubo un problema al guardar el cliente.";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
          <Field type="text" name="name" className="w-full rounded-md p-2" />
          <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Teléfono</label>
          <Field type="text" name="phone" className="w-full rounded-md p-2" />
          <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
        </div>

        {/* Correo */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Correo (opcional)</label>
          <Field type="email" name="email" className="w-full rounded-md p-2" />
          <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
        </div>

        {/* Botón */}
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          {customer ? "Actualizar Cliente" : "Crear Cliente"}
        </button>
      </Form>
    </Formik>
  );
};

export default CustomerForm;