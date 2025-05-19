import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import TrackOrder from "components/map/trackOrders";
import { Order } from "models/Order";
import env from "env/env";
import { motorcycleService } from "services/motorcycleService";

import 'leaflet/dist/leaflet.css';
import { useNotification } from "context/notificationProvider";

const API_URL = env.VITE_API_URL + "/orders";
const BASE_URL = env.BASE_URL;

const TrackingView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [coords, setCoords] = useState<{ lat: number; lng: number }[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    const nots = useNotification();

    // Obtener la orden al montar el componente
    useEffect(() => {
        if (!id) return;

        axios
            .get<Order>(`${API_URL}/${id}`)
            .then((res) => {
                setOrder(res.data);
                console.log("🚚 Orden obtenida:", res.data);
            })
            .catch((err) => {
                console.error("Error al obtener la orden:", err);
                setOrder(null);
            });
    }, [id]);

    // Loggear coords cada vez que cambian
    useEffect(() => {
        console.log("Coords actualizadas en TrackingView:", coords);
    }, [coords]);

    // Limpiar socket al desmontar el componente o cambiar el socket
    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
                console.log("Socket desconectado al desmontar o cambiar socket");
            }
        };
    }, [socket]);

    // Botón: iniciar seguimiento manual y conectar socket
    const handleStartTracking = async () => {
        if (!order?.motorcycle_id) {
            alert("No hay motocicleta asociada a esta orden");
            return;
        }

        setLoading(true);
        try {
            const motorcycle = await motorcycleService.getMotorcycleByID(order.motorcycle_id);
            if (!motorcycle?.license_plate) {
                alert("No se encontró la placa de la moto.");
                setLoading(false);
                return;
            }

            // Crear socket (quitamos el transports polling para que use WebSocket si puede)
            const s = io(BASE_URL, { transports: ["polling"] });

            s.onAny((event, ...args) => {
                console.log(`Evento recibido: ${event}`, args);
            });

            s.on("connect", () => {
                console.log("Socket conectado:", s.id);
                s.emit("join", motorcycle.license_plate);
            });

            // Recibir coordenadas evitando duplicados
            s.on(motorcycle.license_plate, (data: { lat: number; lng: number } | { lat: number; lng: number }[]) => {
                if (Array.isArray(data)) {
                    setCoords((prev) => {
                        const last = prev[prev.length - 1];
                        const filtered = data.filter(coord =>
                            !last || coord.lat !== last.lat || coord.lng !== last.lng
                        );
                        return [...prev, ...filtered];
                    });
                } else {
                    setCoords((prev) => {
                        const last = prev[prev.length - 1];
                        if (!last || last.lat !== data.lat || last.lng !== data.lng) {
                            return [...prev, data];
                        }
                        return prev;
                    });
                }
            });

            s.on("disconnect", () => {
                console.log("Socket desconectado")

                nots.addNotification({
                    id: Date.now(),
                    title: "Tu pedido ha llegado",
                    description: "Recoge tu pedido"
                })
            });
            s.on("error", (err) => console.error("Error de socket:", err));

            setSocket(s);
            setCoords([]); // Limpiar coordenadas previas al iniciar seguimiento

            // Llamar al backend para activar el tracking
            await axios.post(`${BASE_URL}/motorcycles/track/${motorcycle.license_plate}`);
            alert("Seguimiento iniciado");
        } catch (err) {
            console.error(err);
            alert("Error al iniciar seguimiento");
        } finally {
            setLoading(false);
        }
    };

    // Botón: detener seguimiento manual y desconectar socket
    const handleStopTracking = async () => {
        if (!order?.motorcycle_id) {
            alert("No hay motocicleta asociada a esta orden");
            return;
        }

        setLoading(true);
        try {
            const motorcycle = await motorcycleService.getMotorcycleByID(order.motorcycle_id);
            if (!motorcycle?.license_plate) {
                alert("No se encontró la placa de la moto.");
                setLoading(false);
                return;
            }

            await axios.post(`${BASE_URL}/motorcycles/stop/${motorcycle.license_plate}`);
            alert("Seguimiento detenido");

            // Mantener sólo la última coordenada al detener seguimiento
            if (coords.length > 0) {
                setCoords([coords[coords.length - 1]]);
            }

            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        } catch (err) {
            console.error(err);
            alert("Error al detener seguimiento");
        } finally {
            setLoading(false);
        }
    };

    if (!order) return <p>Cargando...</p>;

    return (
        <div>
            <h2>Pedido: {order.id}</h2>
            <p>Estado: {order.status}</p>
            <p>Cliente: {order.customer_id}</p>
            <p>ID de motocicleta: {order.motorcycle_id}</p>

            <button onClick={handleStartTracking} disabled={loading} className="rounded-xl bg-purple-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-purple-600 active:bg-purple-700 dark:bg-purple-400 dark:text-white dark:hover:bg-purple-300 dark:active:bg-purple-200">
                Iniciar seguimiento
            </button>
            <br />
            <button onClick={handleStopTracking} disabled={loading} className="rounded-xl bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200">
                Detener seguimiento
            </button>

            <div>
                <TrackOrder coords={coords} />
            </div>
        </div>
    );
};

export default TrackingView;
