import { Motorcycle } from "models/Motorcycle";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface MotorcycleFormProps {
    handleCreate?: (values: Motorcycle) => void;
    handleUpdate?: (values: Motorcycle) => void;
    motorcycle?: Motorcycle | null;
    isDisabled?: boolean
}

const MotorcycleFormValidator: React.FC<MotorcycleFormProps> = ({ isDisabled, handleCreate, handleUpdate, motorcycle }) => {

    const handleSubmit = (formattedValues: Motorcycle) => {
        if (motorcycle && motorcycle.id)
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
            initialValues={motorcycle ?? {
                license_plate: "",
                brand: "",
                year: 0,
                status: "" // available, in_use, maintenance
            }}
            validationSchema={Yup.object({
                license_plate: Yup.string().required("La placa es obligatoria"),
                brand: Yup.string().required("La marca es obligatoria"),
                year: Yup.number().required("El año es obligatorio").min(1500, "El año es muy antiguo."),
                status: Yup.string().required("El estatus es obligatorio"),
            })}
            onSubmit={(values) => {
                const formattedValues: Motorcycle = {
                    ...values
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

                    {/* brand */}
                    <div>
                        <label htmlFor="brand" className="block text-lg font-medium text-gray-700">Marca</label>
                        <Field
                            type="text"
                            name="brand"
                            disabled={isDisabled}
                            className={`w-full bmotorcycle rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="brand" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* license_plate */}
                    <div>
                        <label htmlFor="license_plate" className="block text-lg font-medium text-gray-700">Número de placa</label>
                        <Field
                            type="text"
                            name="license_plate"
                            disabled={isDisabled}
                            className={`w-full bmotorcycle rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="license_plate" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* year */}
                    <div>
                        <label htmlFor="year" className="block text-lg font-medium text-gray-700">Año</label>
                        <Field
                            type="number"
                            name="year"
                            disabled={isDisabled}
                            className={`w-full bmotorcycle rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="year" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* status */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status</label>
                        <Field as="select" name="status" className="w-full bmotorcycle rounded-md p-2">
                            <option value="">Seleccione un estatus</option>
                            <option value="available">Disponible</option>
                            <option value="in_use">En uso</option>
                            <option value="maintenance">En mantenimiento</option>
                        </Field>
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
                    </div>

                    <button
                        type="submit"
                        className={`py-2 px-4 text-white rounded-md ${!isDisabled ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {!motorcycle ? "Crear Motorcycle" : "Actualizar Motorcycle"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default MotorcycleFormValidator;