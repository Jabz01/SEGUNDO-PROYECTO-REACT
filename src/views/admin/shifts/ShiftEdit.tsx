import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Shift } from "models/Shift";
import { shiftService } from "services/shiftService";
import ShiftForm from "./ShiftForm";

const ShiftEdit = () => {
    const { id } = useParams<{ id: string }>();
    const [shift, setShift] = useState<Shift | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShift = async () => {
        try {
            const data = await shiftService.getShiftByID(Number(id));
            setShift(data);
        } catch (error) {
            console.error("Error al cargar turno:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchShift();
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Cargando turno...</p>;

    return (
        <div>
        <h2 className="text-xl font-bold text-gray-700">Editar Turno</h2>
        {shift ? <ShiftForm shift={shift} /> : <p className="text-red-500">No se encontró el turno.</p>}
        </div>
    );
    };

export default ShiftEdit;