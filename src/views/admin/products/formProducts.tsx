import { useNavigate, useParams } from "react-router-dom";

import Swal from 'sweetalert2';

import { productService } from "services/productService";
import { Product } from "models/Product";
import ProductFormValidator from "components/products/productFormValidation";
import { useEffect, useState } from "react";

const FormProducts = () => {
    const navigate = useNavigate();

    const { id: product_id } = useParams();

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!product_id) return; // Evitar errores si el ID no está disponible
            const data = await productService.getProductByID(parseInt(product_id));
            setProduct(data);
        };

        fetchOrder();
    }, [product_id]);

    const handleCreateProduct = async (product: Product) => {
        try {
            const createdProduct = await productService.createProduct(product);
            if (createdProduct) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Usuario creado con éxito:", createdProduct);
                navigate("/admin/products");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            })
        }
    };

    const handleUpdateProduct = async (product: Product) => {
        /*
        Any update needs an id, otherwise it can corrupt data or something
        */
        if (product.id === null || product.id === undefined) {
            return;
        }

        try {
            const updatedProduct = await productService.updateProduct(product.id, product);
            if (updatedProduct) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/admin/products");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (product_id && !product) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div>
            {/* Formulario para crear un nuevas ordenes */}
            <h2>Create User</h2>
            <ProductFormValidator
                handleCreate={handleCreateProduct}
                handleUpdate={handleUpdateProduct}
                product={product}
            />
        </div>
    );
}

export default FormProducts;