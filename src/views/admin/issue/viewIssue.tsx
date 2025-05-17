import Swal from 'sweetalert2';
import { issueService } from 'services/issueService';
import { useNavigate, useParams } from 'react-router-dom';
import issueFormValidator from 'components/issue/issueFormValidator';
import { Issue } from 'models/Issue';
import { useEffect, useState } from 'react';
import IssueFormValidator from 'components/issue/issueFormValidator';

const Viewissue = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [issue, setIssue] = useState<Issue | null>(null);

    useEffect(() => {
        const fetchissue = async () => {
            try {
                const issue = await issueService.getIssueByID(parseInt(id!));
                if (issue) {
                    setIssue(issue);
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

        if (id) fetchissue();
    }, [id, navigate]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Visualizar Dirección</h2>
            {issue && (
                <>
                    <IssueFormValidator
                        issue={issue}
                        mode={3} // Modo solo lectura
                    />
                    <div className="mt-4">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => navigate("/admin/issue")}
                        >
                            Volver
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Viewissue;
