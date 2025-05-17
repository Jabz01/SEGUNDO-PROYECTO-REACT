import Swal from 'sweetalert2';
import { addressService } from 'services/addressService';
import { useNavigate, useParams } from 'react-router-dom';
import OrderFormValidator from 'components/order/orderFormValidation';
import { useEffect, useState } from 'react';
import { Order } from 'models/Order';

const viewOrder = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const addr = await addressService.getAddressByID(parseInt(id!));
                if (addr) {
                    setOrder(addr);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "No se encontró la dirección.",
                        icon: "error",
                        timer: 3000,
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al obtener la dirección.",
                    icon: "error",
                    timer: 3000,
                });
            }
        };

        if (id) fetchAddress();
    }, [id, navigate]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Visualizar Dirección</h2>
            {order && (
                <>
                    <OrderFormValidator
                        order={order}
                        mode={3} // Modo solo lectura
                    />
                    <div className="mt-4">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => navigate("/admin/orders")}
                        >
                            Volver
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default viewOrder;
