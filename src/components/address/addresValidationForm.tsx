import { Address } from "models/Address";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AddressFormProps {
    mode: number;  // 1: Crear, 2: Actualizar
    handleCreate?: (values: Address) => void;
    handleUpdate?: (values: Address) => void;
    address?: Address | null;
}

const AddressFormValidator: React.FC<AddressFormProps> = ({ mode, handleCreate, handleUpdate, address }) => {


    const handleSubmit = (formattedValues: Address) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);  // Crear dirección
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);  // Actualizar dirección
        } else {
            console.error("No function provided for the current mode");
        }
    };

    return (
        
        <Formik
            initialValues={address ?? {
                street: "",  // Corregido el nombre del campo
                city: "",
                state: "",
                postal_code: "",
                additional_info: "",

            }}
            validationSchema={Yup.object({
                street: Yup.string().required("La calle es obligatoria"),  // Corregido campo
                city: Yup.string().required("La ciudad es obligatoria"),
                state: Yup.string().required("El estado es obligatorio"),
                postal_code: Yup.string().required("El código postal es obligatorio"),
                additional_info: Yup.string().required("La información adicional es obligatoria"),
            })}
            onSubmit={(values) => {
                const formattedValues: Address = {
                    ...values,

                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* street */}
                    <div>
                        <label htmlFor="street" className="block text-lg font-medium text-gray-700">Street</label>
                        <Field
                            type="text"
                            name="street"  // Corregido el nombre del campo
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="street" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* city */}
                    <div>
                        <label htmlFor="city" className="block text-lg font-medium text-gray-700">City</label>
                        <Field
                            type="text"
                            name="city"
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* state */}
                    <div>
                        <label htmlFor="state" className="block text-lg font-medium text-gray-700">State</label>
                        <Field
                            type="text"
                            name="state"
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="state" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* postal_code */}
                    <div>
                        <label htmlFor="postal_code" className="block text-lg font-medium text-gray-700">Postal Code</label>
                        <Field
                            type="text"
                            name="postal_code"
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="postal_code" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* additional_info */}
                    <div>
                        <label htmlFor="additional_info" className="block text-lg font-medium text-gray-700">Additional Info</label>
                        <Field
                            type="text"
                            name="additional_info"
                            className="w-full border rounded-md p-2"
                        />
                        <ErrorMessage name="additional_info" component="p" className="text-red-500 text-sm" />
                    </div>

                    <button
                        type="submit"
                        className={`py-2 px-4 text-white rounded-md ${mode === 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {mode === 1 ? "Crear Dirección" : "Actualizar Dirección"}
                    </button>
                </Form>
                
            )}
        </Formik>
    );
};

export default AddressFormValidator;
