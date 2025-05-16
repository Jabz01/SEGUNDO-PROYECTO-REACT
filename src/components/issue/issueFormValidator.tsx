import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Issue } from "models/Issue";

interface IssueFormProps {
    mode: number;
    handleCreate?: (values: Issue) => void;
    handleUpdate?: (values: Issue) => void;
    issue?: Issue | null;
}

const IssueFormValidator: React.FC<IssueFormProps> = ({ mode, handleCreate, handleUpdate, issue }) => {
    const isDisabled = mode === 2;

    const convertToSQLDateTime = (iso: string): string => {
        const d = new Date(iso);
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };

    return (
        <Formik
            initialValues={issue ?? {
                motorcycle_id: 1,
                description: "",
                issue_type: "",
                date_reported: issue?.date_reported
                    ? new Date(issue.date_reported).toISOString().slice(0, 16) // "YYYY-MM-DDTHH:mm"
                    : new Date().toISOString().slice(0, 16),
                status: "pendiente",
            }}
            validationSchema={Yup.object({
                id_motocycle: Yup.number().required("La motocicleta es obligatoria").positive().integer(),
                description: Yup.string().required("La descripción es obligatoria").min(5, "Debe tener al menos 5 caracteres"),
                issue_type: Yup.string().required("El tipo de problema es obligatorio"),
                date_reported: Yup.date().required("La fecha es obligatoria"),
                status: Yup.string().required("El estado es obligatorio").oneOf(["pendiente", "en_proceso", "resuelto", "cancelado"]),
            })}
            onSubmit={(values) => {
                const formattedValues: Issue = {
                    ...values,
                    motorcycle_id: values.motorcycle_id,
                    date_reported: convertToSQLDateTime(values.date_reported),
                };

                if (mode === 1 && handleCreate) {
                    handleCreate(formattedValues);
                } else if (mode === 2 && handleUpdate) {
                    handleUpdate(formattedValues);
                } else {
                    console.error("No se proporcionó una función para el modo actual");
                }
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* ID Motocicleta */}
                    <div>
                        <label htmlFor="id_motocycle" className="block text-lg font-medium text-gray-700">ID Motocicleta</label>
                        <Field
                            type="number"
                            name="id_motocycle"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="id_motocycle" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Descripción</label>
                        <Field
                            as="textarea"
                            name="description"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 h-24 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Tipo de Problema */}
                    <div>
                        <label htmlFor="issue_type" className="block text-lg font-medium text-gray-700">Tipo de Problema</label>
                        <Field
                            as="select"
                            name="issue_type"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        >
                            <option value="">Selecciona un tipo</option>
                            <option value="Falla mecánica">Falla mecánica</option>
                            <option value="Pinchazo">Pinchazo</option>
                            <option value="Batería descargada">Batería descargada</option>
                            <option value="Problema con frenos">Problema con frenos</option>
                            <option value="Accidente leve">Accidente leve</option>
                            <option value="Problema con el GPS">Problema con el GPS</option>
                            <option value="Otro">Otro</option>
                        </Field>
                        <ErrorMessage name="issue_type" component="p" className="text-red-500 text-sm" />
                    </div>


                    {/* Fecha Reportada */}
                    <div>
                        <label htmlFor="date_reported" className="block text-lg font-medium text-gray-700">Fecha Reportada</label>
                        <Field
                            type="datetime-local"
                            name="date_reported"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="date_reported" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Estado */}
                    <div>
                        <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
                        <Field
                            as="select"
                            name="status"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="en_proceso">En proceso</option>
                            <option value="resuelto">Resuelto</option>
                            <option value="cancelado">Cancelado</option>
                        </Field>
                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        disabled={isDisabled}
                    >
                        {mode === 1 ? "Crear Reporte" : "Actualizar Reporte"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default IssueFormValidator;
