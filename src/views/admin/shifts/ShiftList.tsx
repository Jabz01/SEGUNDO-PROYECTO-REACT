import { useEffect, useState } from "react";
import { Shift } from "models/Shift";
import { shiftService } from "services/shiftService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Edit, Trash2, Plus } from "lucide-react"; 

const ShiftList = () => {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShifts = async () => {
        try {
            const data = await shiftService.getShifts();
            setShifts(data);
        } catch (error) {
            console.error("Error al cargar turnos:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchShifts();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás recuperar este turno después de eliminarlo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        });

        if (confirmDelete.isConfirmed) {
        try {
            await shiftService.deleteShift(id);
            setShifts(shifts.filter((s) => s.id !== id));
            Swal.fire("Eliminado", "El turno ha sido eliminado.", "success");
        } catch (error) {
            Swal.fire("Error", "No se pudo eliminar el turno.", "error");
        }
        }
    };

    if (loading) return <p className="text-center text-gray-500">Cargando turnos...</p>;

    return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm bg-white shadow-md dark:bg-boxdark">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-700">Lista de Turnos</h2>
            <button
              onClick={() => navigate("/admin/shifts/create")}
              className="my-4 py-2 px-4 flex items-center bg-blue-500 text-white rounded-md hover:bg-green-600"
            >
              <Plus size={20} className="mr-2" /> Crear Turno
            </button>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Conductor</th>
                    <th className="px-6 py-3">Moto</th>
                    <th className="px-6 py-3">Inicio</th>
                    <th className="px-6 py-3">Fin</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts.map((shift) => (
                    <tr key={shift.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-6 py-4">{shift.driver.name}</td>
                      <td className="px-6 py-4">{shift.motorcycle.brand} - {shift.motorcycle.license_plate}</td>
                      <td className="px-6 py-4">{new Date(shift.start_time).toLocaleString()}</td>
                      <td className="px-6 py-4">{shift.end_time ? new Date(shift.end_time).toLocaleString() : "En curso"}</td>
                      <td className={`px-6 py-4 ${shift.status === "completed" ? "text-green-600" : "text-red-600"}`}>
                        {shift.status === "completed" ? "Completado" : "Activo"}
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/shifts/edit/${shift.id}`)}
                          className="text-yellow-600 dark:text-yellow-500"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(shift.id!)}
                          className="text-red-600 dark:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftList;