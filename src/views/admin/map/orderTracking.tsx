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

    useEffect(() => {
        if (!id) return;
        axios
            .get<Order>(`${API_URL}/${id}`)
            .then((res) => setOrder(res.data))
            .catch((err) => {
                console.error("Error al obtener la orden:", err);
                setOrder(null);
            });
    }, [id]);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
                console.log("Socket desconectado al desmontar");
            }
        };
    }, [socket]);

    const handleStartTracking = async () => {
        if (!order?.motorcycle_id) return alert("No hay motocicleta asociada");
        setLoading(true);
        try {
            const motorcycle = await motorcycleService.getMotorcycleByID(order.motorcycle_id);
            if (!motorcycle?.license_plate) return alert("Placa no encontrada");

            const s = io(BASE_URL, { transports: ["polling"] });
            s.on("connect", () => {
                s.emit("join", motorcycle.license_plate);
            });
            s.on(motorcycle.license_plate, (data) => {
                setCoords((prev) => {
                    const last = prev[prev.length - 1];
                    const newCoords = Array.isArray(data) ? data : [data];
                    return [
                        ...prev,
                        ...newCoords.filter(c => !last || c.lat !== last.lat || c.lng !== last.lng)
                    ];
                });
            });
            s.on("disconnect", () => {
                nots.addNotification({
                    id: Date.now(),
                    title: "Tu pedido ha llegado",
                    description: "Recoge tu pedido"
                });
            });

            setSocket(s);
            setCoords([]);
            await axios.post(`${BASE_URL}/motorcycles/track/${motorcycle.license_plate}`);
            alert("Seguimiento iniciado");
        } catch (err) {
            console.error(err);
            alert("Error al iniciar seguimiento");
        } finally {
            setLoading(false);
        }
    };

    const handleStopTracking = async () => {
        if (!order?.motorcycle_id) return alert("No hay motocicleta asociada");
        setLoading(true);
        try {
            const motorcycle = await motorcycleService.getMotorcycleByID(order.motorcycle_id);
            if (!motorcycle?.license_plate) return alert("Placa no encontrada");

            await axios.post(`${BASE_URL}/motorcycles/stop/${motorcycle.license_plate}`);
            alert("Seguimiento detenido");
            if (coords.length > 0) setCoords([coords[coords.length - 1]]);
            socket?.disconnect();
            setSocket(null);
        } catch (err) {
            console.error(err);
            alert("Error al detener seguimiento");
        } finally {
            setLoading(false);
        }
    };

    if (!order) return <p className="text-center mt-6">Cargando...</p>;

    return (
        <div className="p-4 max-w-5xl mx-auto space-y-6">
            <div className="space-y-2 text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                    Pedido: {order.id}
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Estado: {order.status}
                </p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Cliente: {order.customer_id}
                </p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    ID Motocicleta: {order.motorcycle_id}
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={handleStartTracking}
                    disabled={loading}
                    className="flex-1 rounded-xl bg-purple-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-purple-600 active:bg-purple-700 dark:bg-purple-400 dark:hover:bg-purple-300"
                >
                    Iniciar seguimiento
                </button>

                <button
                    onClick={handleStopTracking}
                    disabled={loading}
                    className="flex-1 rounded-xl bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:hover:bg-red-300"
                >
                    Detener seguimiento
                </button>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md h-[300px] md:h-[400px] w-full">
                <TrackOrder coords={coords} />
            </div>
        </div>
    );
};

export default TrackingView;
