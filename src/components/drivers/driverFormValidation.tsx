import { Driver } from "models/Driver";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface DriverFormProps {
    handleCreate?: (values: Driver) => void;
    handleUpdate?: (values: Driver) => void;
    driver?: Driver | null;
    isDisabled?: boolean
}

const DriverFormValidator: React.FC<DriverFormProps> = ({ isDisabled, handleCreate, handleUpdate, driver }) => {

    const handleSubmit = (formattedValues: Driver) => {
        if (driver && driver.id)
        {
            handleUpdate(formattedValues);
        }
        else
        {
            handleCreate(formattedValues);
        }
    };

    return (
        <Formik
            initialValues={driver ?? {
                name: "",
                license_number: "",
                phone: "",
                email: "",
                status: ""
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("El nombre es obligatorio"),
                license_number: Yup.string().required("La descripción es obligatoria"),
                phone: Yup.string().required("El teléfono es obligatorio"),
                email: Yup.string().required("El correo electrónico es obligatorio"),
                status: Yup.string().required("El estatus es obligatorio"),
            })}
            onSubmit={(values) => {
                const formattedValues: Driver = {
                    ...values
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

                    {/* name */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
                        <Field
                            type="text"
                            name="name"
                            disabled={isDisabled}
                            className={`w-full bdriver rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* license_number */}
                    <div>
                        <label htmlFor="license_number" className="block text-lg font-medium text-gray-700">Número de licencia</label>
                        <Field
                            type="text"
                            name="license_number"
                            disabled={isDisabled}
                            className={`w-full bdriver rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="license_number" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* phone */}
                    <div>
                        <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Teléfono</label>
                        <Field
                            type="text"
                            name="phone"
                            disabled={isDisabled}
                            className={`w-full bdriver rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="phone" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* email */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Correo electrónico</label>
                        <Field
                            type="text"
                            name="email"
                            disabled={isDisabled}
                            className={`w-full bdriver rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* status */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status</label>
                        <Field as="select" name="status" className="w-full bdriver rounded-md p-2">
                            <option value="">Seleccione un estatus</option>
                            <option value="available">Disponible</option>
                            <option value="on_shift">En turno</option>
                            <option value="unavailable">No Disponible</option>
                        </Field>
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
                    </div>

                    <button
                        type="submit"
                        className={`py-2 px-4 text-white rounded-md ${!isDisabled ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {!driver ? "Crear Driver" : "Actualizar Driver"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default DriverFormValidator;