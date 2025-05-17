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
    const isDisabled = mode === 3;

    return (
        <Formik
            initialValues={order ?? {
                customer_id: 1,
                menu_id: 1,
                motorcycle_id: 1,
                quantity: 1,
                total_price: 0,
                status: "pending",
            }}
            validationSchema={Yup.object({
                customer_id: Yup.number().required().positive().integer(),
                menu_id: Yup.number().required().positive().integer(),
                motorcycle_id: Yup.number().required().positive().integer(),
                quantity: Yup.number().required().positive().integer(),
                total_price: Yup.number().required().min(0),
                status: Yup.string().required().oneOf(["pending", "in_progress", "delivered", "cancelled"]),
            })}
            onSubmit={(values) => {
                const formattedValues: Order = {
                    ...values,
                    quantity: Number(values.quantity),
                    total_price: Number(values.total_price),
                };

                // No se asigna order_id aún; se hará después de crear la orden
                if (mode === 1 && handleCreate) {
                    handleCreate(formattedValues);
                } else if (mode === 2 && handleUpdate) {
                    handleUpdate(formattedValues);
                } else {
                    console.error("No function provided for the current mode");
                }
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* customer_id */}
                    <div>
                        <label htmlFor="customer_id" className="block text-lg font-medium text-gray-700">Customer ID</label>
                        <Field
                            type="number"
                            name="customer_id"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="customer_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* menu_id */}
                    <div>
                        <label htmlFor="menu_id" className="block text-lg font-medium text-gray-700">Menu ID</label>
                        <Field
                            type="number"
                            name="menu_id"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="menu_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* motorcycle_id */}
                    <div>
                        <label htmlFor="motorcycle_id" className="block text-lg font-medium text-gray-700">Motorcycle ID</label>
                        <Field
                            type="number"
                            name="motorcycle_id"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="motorcycle_id" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
                        <Field
                            type="number"
                            name="quantity"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="quantity" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* total_price */}
                    <div>
                        <label htmlFor="total_price" className="block text-lg font-medium text-gray-700">Total Price</label>
                        <Field
                            type="number"
                            name="total_price"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="total_price" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* status */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status</label>
                        <Field
                            as="select"
                            name="status"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </Field>
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
                    </div>

                    {(mode === 1 || mode === 2) && (
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            disabled={isDisabled}
                        >
                            {mode === 1 ? "Registrar pedido" : "Actualizar pedido"}
                        </button>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default OrderFormValidator;
