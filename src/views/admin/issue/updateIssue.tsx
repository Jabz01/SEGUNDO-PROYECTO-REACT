import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { issueService } from "services/issueService";
import Swal from "sweetalert2";

import { Issue } from "models/Issue";
import IssueFormValidator from "components/issue/issueFormValidator";

const UpdateIssue = () => {
  const { id: issue_id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      if (!issue_id) return; // Evita error si no hay ID
      const issueData = await issueService.getIssueByID(parseInt(issue_id));
      setIssue(issueData);
    };

    fetchIssue();
  }, [issue_id]);

  const handleUpdateIssue = async (theIssue: Issue) => {
    try {
      const updatedIssue = await issueService.updateIssue(theIssue.id || 0, theIssue);
      if (updatedIssue) {
        Swal.fire({
          title: "Completado",
          text: "Se ha actualizado correctamente el issue",
          icon: "success",
          timer: 3000,
        });
        navigate('/admin/issues'); 
      } else {
        Swal.fire({
          title: "Error",
          text: "Existe un problema al momento de actualizar el issue",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Existe un problema al momento de actualizar el issue",
        icon: "error",
        timer: 3000,
      });
    }
  };

  if (!issue) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <IssueFormValidator
        handleUpdate={handleUpdateIssue}
        mode={2} // 2 para modo actualización
        issue={issue}
      />
    </>
  );
};

export default UpdateIssue;
