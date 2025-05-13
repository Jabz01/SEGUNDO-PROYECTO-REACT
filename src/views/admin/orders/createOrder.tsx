import Swal from 'sweetalert2';
import { orderService } from 'services/orderService';
import { useNavigate } from "react-router-dom";
import OrderFormValidator from 'components/order/orderFormValidation';
import { Order } from 'models/Order';
import { addressService } from 'services/addressService';

const App = () => {
    const navigate = useNavigate();

    // Lógica de creación
    const handleCreateOrder = async (order: Order) => {
        try {
            // Crear la orden
            const createdOrder = await orderService.createOrder(order);
            console.log("🟢 Orden creada:", createdOrder);

            // Crear la dirección asociada a la orden, usando la propiedad 'address' del objeto 'order'

            if (createdOrder) {
                const addressData = {
                ...order.address,  // Los datos de la dirección ya están en 'order.address'
                order_id: createdOrder.id,  // Asociamos la dirección con la orden creada
                };
                await addressService.createAddress(addressData);
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                console.log("Orden creada con éxito:", createdOrder);
                navigate("/admin/orders");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
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
