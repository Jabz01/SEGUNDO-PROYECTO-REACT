import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Photo } from "models/photo";

interface PhotoFormProps {
    mode: number; // 1: Crear, 2: Actualizar
    handleCreate?: (values: Photo & { photoFiles?: File[] }) => void;
    handleUpdate?: (values: Photo & { photoFiles?: File[] }) => void;
    photo?: Photo | null;
}

const PhotoFormValidator: React.FC<PhotoFormProps> = ({ mode, handleCreate, handleUpdate, photo }) => {
    const isDisabled = mode === 2;

    return (
        <Formik
            initialValues={{
                caption: photo?.caption ?? "",
                issue_id: photo?.issue_id ?? undefined,
                taken_at: photo?.taken_at ?? "",
                photoFiles: [] as File[], // múltiples archivos
            }}
            validationSchema={Yup.object({
                caption: Yup.string()
                    .nullable()
                    .max(255, "La descripción debe tener como máximo 255 caracteres"),
            })}
            onSubmit={(values) => {
                const formattedValues: Photo & { photoFiles?: File[] } = {
                    caption: values.caption,
                    issue_id: values.issue_id,
                    photoFiles: values.photoFiles,
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
            {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    {/* Descripción */}
                    <div>
                        <label htmlFor="caption" className="block text-lg font-medium text-gray-700">Descripción</label>
                        <Field
                            as="textarea"
                            name="caption"
                            disabled={isDisabled}
                            className={`w-full border rounded-md p-2 h-24 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="caption" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Fotos */}
                    <div>
                        <label htmlFor="photoFiles" className="block text-lg font-medium text-gray-700">Fotos</label>
                        <input
                            id="photoFiles"
                            name="photoFiles"
                            type="file"
                            accept="image/*"
                            multiple
                            disabled={isDisabled}
                            onChange={(event) => {
                                const files = Array.from(event.currentTarget.files ?? []);
                                setFieldValue("photoFiles", files);
                            }}
                            className={`w-full border rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                    </div>

                    {/* Botón */}
                    {(mode === 1 || mode === 2) && (
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md"
                            disabled={isDisabled}
                        >
                            {mode === 1 ? "Subir foto(s)" : "Actualizar evidencia fotografica"}
                        </button>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default PhotoFormValidator;
