import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { orderService } from "services/orderService";
import Swal from "sweetalert2";

import { Order } from "models/Order";
import OrderFormValidator from "components/order/orderFormValidation";

const UpdateOrder = () => {
    const { id: order_id } = useParams(); 
    
    const navigate = useNavigate();
    const [ order, setOrder] = useState<Order | null>(null);


    useEffect(() => {
        console.log("Id->"+order_id)
        const fetchOrder = async () => {
            if (!order_id) return; // Evitar errores si el ID no está disponible
            const orderData = await orderService.getOrderByID(parseInt(order_id));
            setOrder(orderData);
        };

        fetchOrder();
    }, [order_id]);

    const handleUpdateOrder = async (theOrder: Order) => {
        try {
            const updatedUser = await orderService.updateOrder(theOrder.id || 0, theOrder);
            if (updatedUser) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/admin/orders"); // Redirección en React Router
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

    if (!order) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <>
            <OrderFormValidator
                handleUpdate={handleUpdateOrder}
                mode={2} // 2 significa actualización
                order={order}
            />
        </>
    );
};

export default UpdateOrder;