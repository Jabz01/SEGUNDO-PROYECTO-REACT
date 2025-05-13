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
    const isDisabled = mode === 2;

    return (
        <Formik
            initialValues={order ?? {
                customer_id: 1,
                menu_id: 1,
                motorcycle_id: 1,
                quantity: 1,
                total_price: 0,
                status: "",
                address: {
                    street: "",
                    city: "",
                    state: "",
                    postal_code: "",
                    additional_info: "",
                }
            }}
            validationSchema={Yup.object({
                customer_id: Yup.number().required().positive().integer(),
                menu_id: Yup.number().required().positive().integer(),
                motorcycle_id: Yup.number().required().positive().integer(),
                quantity: Yup.number().required().positive().integer(),
                total_price: Yup.number().required().min(0),
                status: Yup.string().required().oneOf(["pending", "in_progress", "delivered", "cancelled"]),
                address: Yup.object({
                    street: Yup.string().required().max(100),
                    city: Yup.string().required().max(50),
                    state: Yup.string().required().max(50),
                    postal_code: Yup.string().required().matches(/^\d{4,10}$/, "Código postal inválido"),
                    additional_info: Yup.string().max(255),
                })
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

                    {/* Address Fields */}
                    <div>
                        <label htmlFor="street" className="block text-lg font-medium text-gray-700">Street</label>
                        <Field
                            type="text"
                            name="address.street"
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="address.street" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-lg font-medium text-gray-700">City</label>
                        <Field
                            type="text"
                            name="address.city"
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="address.city" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="state" className="block text-lg font-medium text-gray-700">State</label>
                        <Field
                            type="text"
                            name="address.state"
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="address.state" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="postal_code" className="block text-lg font-medium text-gray-700">Postal Code</label>
                        <Field
                            type="text"
                            name="address.postal_code"
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="address.postal_code" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="additional_info" className="block text-lg font-medium text-gray-700">Additional Info</label>
                        <Field
                            type="text"
                            name="address.additional_info"
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="address.additional_info" component="p" className="text-red-500 text-sm" />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        disabled={isDisabled}
                    >
                        {mode === 1 ? "Create Order" : "Update Order"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default OrderFormValidator;
