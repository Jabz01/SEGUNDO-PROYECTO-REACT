import Swal from 'sweetalert2';
import { orderService } from 'services/orderService';
import { useNavigate } from "react-router-dom";
import OrderFormValidator from 'components/order/orderFormValidation';
import { Order } from 'models/Order';

const App = () => {
    const navigate = useNavigate();

    // Lógica de creación
    const handleCreateOrder = async (order: Order) => {
        try {
            const createdOrder = await orderService.createOrder(order);

            if (createdOrder) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });

                console.log("Orden creada con éxito:", createdOrder);
                navigate(`/admin/orders/create/address/${createdOrder.id}`);
            } else {
                Swal.fire({
                    title: "Error",
                    text: "La orden fue creada pero no se obtuvo el ID",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            console.error("Error al crear la orden:", error);
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    return (
        <div>
            {/* Formulario para crear nuevas órdenes */}
            <h2>Create Order</h2>
            <OrderFormValidator
                handleCreate={handleCreateOrder}
                mode={1}
            />
        </div>
    );
};

export default App;
