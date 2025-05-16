import Swal from 'sweetalert2';
import { issueService } from 'services/issueService';
import { useNavigate } from 'react-router-dom';
import IssueFormValidator from 'components/issue/issueFormValidator';
import { Issue } from 'models/Issue';

const CreateIssue = () => {

  const navigate = useNavigate();

  const handleCreateIssue = async (issue: Issue) => {
    try {

      const createdIssue: any = await issueService.createIssue(issue);

      if (createdIssue) {
        Swal.fire({
          title: 'Completado',
          text: 'Se ha creado correctamente el issue',
          icon: 'success',
          timer: 3000,
        });
        console.log('Issue creado con éxito:', createdIssue);
        navigate(`/admin/issues/photo/${createdIssue[0].id}`);
        
      } else {
        Swal.fire({
          title: 'Error',
          text: 'El issue fue creado pero no se obtuvo el ID',
          icon: 'error',
          timer: 3000,
        });
      }
    } catch (error) {
      console.error('Error al crear el issue:', error);
      Swal.fire({
        title: 'Error',
        text: 'Existe un problema al momento de crear el registro',
        icon: 'error',
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <h2>Reportar problema</h2>
      <IssueFormValidator handleCreate={handleCreateIssue} mode={1} />
    </div>
  );
};

export default CreateIssue;
