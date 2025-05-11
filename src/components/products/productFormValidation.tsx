import { Product } from "models/Product";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ProductFormProps {
    handleCreate?: (values: Product) => void;
    handleUpdate?: (values: Product) => void;
    product?: Product | null;
    isDisabled?: boolean
}

const ProductFormValidator: React.FC<ProductFormProps> = ({ isDisabled, handleCreate, handleUpdate, product }) => {

    const handleSubmit = (formattedValues: Product) => {
        if (product && product.id)
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
            initialValues={product ?? {
                name: "",
                description: "",
                price: 0,
                category: ""
            }}
            validationSchema={Yup.object({
                price: Yup.number().required("El precio es obligatorio").min(0, "No puede ser negativo"),

                name: Yup.string().required("El nombre es obligatorio"),
                description: Yup.string().required("La descripción es obligatoria"),
                category: Yup.string().required("La categoría es obligatoria"),
            })}
            onSubmit={(values) => {
                const formattedValues: Product = {
                    ...values,
                    price: Number(values.price),
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">

                    {/* total_price */}
                    <div>
                        <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price</label>
                        <Field
                            type="number"
                            name="price"
                            disabled={isDisabled}
                            className={`w-full bproduct rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="price" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* name */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
                        <Field
                            type="text"
                            name="name"
                            disabled={isDisabled}
                            className={`w-full bproduct rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* description */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Descripción</label>
                        <Field
                            type="text"
                            name="description"
                            disabled={isDisabled}
                            className={`w-full bproduct rounded-md p-2 ${isDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
                        />
                        <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* category */}
                    <div>
                        <label htmlFor="category" className="block text-lg font-medium text-gray-700">Categoría</label>
                        <Field as="select" name="category" className="w-full bproduct rounded-md p-2">
                            <option value="">Seleccione una categoría</option>
                            <option value="comida">Comida</option>
                            <option value="bebida">Bebida</option>
                            <option value="salsa">Salsa</option>
                            <option value="carne">Meat</option>
                        </Field>
                        <ErrorMessage name="category" component="p" className="text-red-500 text-sm" />
                    </div>

                    <button
                        type="submit"
                        className={`py-2 px-4 text-white rounded-md ${!isDisabled ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {!product ? "Crear Producto" : "Actualizar Producto"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ProductFormValidator;