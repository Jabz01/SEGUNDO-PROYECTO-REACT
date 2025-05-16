import Swal from 'sweetalert2';
import { photoService } from 'services/photoService';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoFormValidator from 'components/photo/photoValidatorForm';
import { Photo } from 'models/photo';

const CreatePhoto = () => {
    const navigate = useNavigate();
    const { issue_id: id } = useParams();

    const handleCreatePhoto = async (photo: Photo & { photoFiles?: File[] }) => {
        try {
            const urls: string[] = [];

            for (const file of photo.photoFiles ?? []) {
                const url = await photoService.uploadTempPhoto(file, parseInt(id!));
                if (url) urls.push(url);
            }

            // Crea una entrada en base de datos para cada imagen subida
            for (const url of urls) {
                await photoService.createPhoto({
                    caption: photo.caption,
                    issue_id: parseInt(id!),
                    image_url: url, 
                });
            }

            Swal.fire({
                title: 'Completado',
                text: 'La(s) foto(s) se han creado y subido correctamente.',
                icon: 'success',
                timer: 3000,
            });

            navigate(`/admin/issues`);
        } catch (error) {
            console.error('Error al crear la(s) foto(s):', error);
            Swal.fire({
                title: 'Error',
                text: 'Existe un problema al momento de crear las fotos',
                icon: 'error',
                timer: 3000,
            });
        }
    };
    return (
        <div>
            <h2>Reportar problema</h2>
            <PhotoFormValidator handleCreate={handleCreatePhoto} mode={1} />
        </div>
    );

};



export default CreatePhoto;
