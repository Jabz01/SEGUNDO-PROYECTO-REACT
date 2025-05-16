import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { issueService } from "services/issueService";
import { Issue } from "models/Issue";

const ListIssues = () => {
  const [data, setData] = useState<Issue[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const issues = await issueService.getIssues();
    setData(issues);
  };

  const handleView = (id: number) => {
    navigate(`/admin/issues/view/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/issues/update/${id}`);
  };

  const handleCreate = () => {
    navigate(`/admin/issues/report`);
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Eliminar issue?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await issueService.deleteIssue(id);
        if (success) {
          Swal.fire("Eliminado", "El issue ha sido eliminado.", "success");
          fetchData();
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Listado de Issues</h3>
          </div>

          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Descripción</th>
                    <th className="px-6 py-3">Estatus</th>
                    <th className="px-6 py-3">Fecha creación</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((issue) => (
                    <tr key={issue.id} className="border-b dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{issue.id}</td>
                      <td className="px-6 py-4">{issue.description}</td>
                      <td className="px-6 py-4">{issue.status}</td>
                      <td className="px-6 py-4">{new Date(issue.date_reported).toLocaleDateString()}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button onClick={() => handleView(issue.id!)} className="text-blue-600 dark:text-blue-500">
                          <Eye size={20} />
                        </button>
                        <button onClick={() => handleEdit(issue.id!)} className="text-yellow-600 dark:text-yellow-500">
                          <Edit size={20} />
                        </button>
                        <button onClick={() => handleDelete(issue.id!)} className="text-red-600 dark:text-red-500">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={handleCreate}
                className="m-2 py-2 px-4 text-white rounded-md bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
              >
                <Plus size={20} /> Crear Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListIssues;
