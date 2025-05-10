import { Order } from "models/Order";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface OrderFormProps {
    mode: number; 
    handleCreate?: (values: Order) => void;
    handleUpdate?: (values: Order) => void;
    order?: Order | null;
}

const OrderFormValidator: React.FC<OrderFormProps> = ({ mode, handleCreate, handleUpdate, order }) => {
    const handleSubmit = (formattedValues: Order) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);
        } else {
            console.error("No function provided for the current mode");
        }
    };

    return (
        <Formik
            initialValues={order ?? {
                customer_id: undefined,
                menu_id: undefined,
                motorcycle_id: undefined,
                quantity: 1,
                total_price: 0,
                status: "",
            }}
            validationSchema={Yup.object({
                customer_id: Yup.number().required("El ID del cliente es obligatorio").positive().integer(),
                menu_id: Yup.number().required("El ID del menú es obligatorio").positive().integer(),
                motorcycle_id: Yup.number().required("El ID de la moto es obligatorio").positive().integer(),
                quantity: Yup.number().required("La cantidad es obligatoria").positive().integer(),
                total_price: Yup.number().required("El precio total es obligatorio").min(0, "No puede ser negativo"),
                status: Yup.string().required("El estado es obligatorio"),
            })}
            onSubmit={(values) => {
                const formattedValues: Order = {
                    ...values,
                    quantity: Number(values.quantity),
                    total_price: Number(values.total_price),
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* customer_id */}
                    <div>
                        <label htmlFor="customer_id" className="block text-lg font-medium text-gray-700">Customer ID</label>
                        <Field type="number" name="customer_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="customer_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* menu_id */}
                    <div>
                        <label htmlFor="menu_id" className="block text-lg font-medium text-gray-700">Menu ID</label>
                        <Field type="number" name="menu_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="menu_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* motorcycle_id */}
                    <div>
                        <label htmlFor="motorcycle_id" className="block text-lg font-medium text-gray-700">Motorcycle ID</label>
                        <Field type="number" name="motorcycle_id" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
                        <Field type="number" name="quantity" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="quantity" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* total_price */}
                    <div>
                        <label htmlFor="total_price" className="block text-lg font-medium text-gray-700">Total Price</label>
                        <Field type="number" name="total_price" className="w-full border rounded-md p-2" />
                        <ErrorMessage name="total_price" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* status */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status</label>
                        <Field as="select" name="status" className="w-full border rounded-md p-2">
                            <option value="">Seleccione un estado</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </Field>
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
                    </div>

                    <button
                        type="submit"
                        className={`py-2 px-4 text-white rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear Orden" : "Actualizar Orden"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default OrderFormValidator;