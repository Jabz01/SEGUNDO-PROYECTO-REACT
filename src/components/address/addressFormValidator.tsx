import { Address } from "models/Address";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AddressFormProps {
    mode: number;
    handleCreate?: (values: Address) => void;
    handleUpdate?: (values: Address) => void;
    address?: Address | null;
}

const AddressFormValidator: React.FC<AddressFormProps> = ({ mode, handleCreate, handleUpdate, address }) => {
    const isDisabled = mode === 2;

    return (
        <Formik
            initialValues={address ?? {
                street: '',
                city: '',
                state: '',
                postal_code: '',
                additional_info: '',
                order_id: undefined,
            }}
            validationSchema={Yup.object({
                street: Yup.string().required('Street is required'),
                city: Yup.string().required('City is required'),
                state: Yup.string().required('State is required'),
                postal_code: Yup.string().required('Postal code is required'),
                additional_info: Yup.string().required('Additional info is required'),
            })}
            onSubmit={(values) => {
                const formattedValues: Address = {
                    ...values,
                    postal_code: String(values.postal_code), // Ensuring postal_code is a string if not already
                };

                // No se asigna address_id aún; se hará después de crear la dirección
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
                    {/* street */}
                    <div>
                        <label htmlFor="street" className="block text-lg font-medium text-gray-700">Street</label>
                        <Field
                            type="text"
                            name="street"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="street" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* city */}
                    <div>
                        <label htmlFor="city" className="block text-lg font-medium text-gray-700">City</label>
                        <Field
                            type="text"
                            name="city"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* state */}
                    <div>
                        <label htmlFor="state" className="block text-lg font-medium text-gray-700">State</label>
                        <Field
                            type="text"
                            name="state"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="state" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* postal_code */}
                    <div>
                        <label htmlFor="postal_code" className="block text-lg font-medium text-gray-700">Postal Code</label>
                        <Field
                            type="text"
                            name="postal_code"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="postal_code" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* additional_info */}
                    <div>
                        <label htmlFor="additional_info" className="block text-lg font-medium text-gray-700">Additional Info</label>
                        <Field
                            type="text"
                            name="additional_info"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="additional_info" component="p" className="text-red-500 text-sm" />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        disabled={isDisabled}
                    >
                        {mode === 1 ? "Create Address" : "Update Address"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AddressFormValidator;
