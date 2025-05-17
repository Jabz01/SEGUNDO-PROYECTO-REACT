import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Photo } from "models/photo";
import { photoService } from "services/photoService";

const ListPhotos = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        const data = await photoService.getPhotos();
        setPhotos(data);
    };

    const handleView = (id: number) => {
        navigate(`/admin/photos/view/${id}`);
    };

    const handleEdit = (id: number) => {
        navigate(`/admin/photos/update/${id}`);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "¿Eliminar foto?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await photoService.deletePhoto(id);
                if (success) {
                    Swal.fire("Eliminada", "La foto ha sido eliminada.", "success");
                    fetchPhotos();
                }
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Listado de Fotos</h3>
                    </div>

                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">URL imagen</th>
                                        <th className="px-6 py-3">Caption</th>
                                        <th className="px-6 py-3">Fecha tomada</th>
                                        <th className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {photos.map((photo) => (
                                        <tr key={photo.id} className="border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{photo.id}</td>
                                            <td className="px-6 py-4">
                                                {photo.image_url ? (
                                                    <span className="text-blue-600 break-words">{photo.image_url}</span>
                                                ) : (
                                                    <span className="text-gray-400 italic">Sin URL</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">{photo.caption || "—"}</td>
                                            <td className="px-6 py-4">
                                                {photo.taken_at
                                                    ? new Date(photo.taken_at).toLocaleDateString()
                                                    : "—"}
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(photo.id!)} className="text-blue-600 dark:text-blue-500">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(photo.id!)} className="text-yellow-600 dark:text-yellow-500">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(photo.id!)} className="text-red-600 dark:text-red-500">
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

export default ListPhotos;
