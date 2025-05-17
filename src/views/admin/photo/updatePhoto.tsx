import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Photo } from "models/photo";
import { photoService } from "services/photoService";
import PhotoFormValidator from "components/photo/photoValidatorForm";
const PhotoUpdate = () => {
  const { id: photo_id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!photo_id) return;
      const photoData = await photoService.getPhotoByID(parseInt(photo_id));
      setPhoto(photoData);
    };

    fetchPhoto();
  }, [photo_id]);

  const handleUpdatePhoto = async (thePhoto: Photo) => {
    try {
      const updatedPhoto = await photoService.updatePhoto(thePhoto.id, thePhoto);

      if (!thePhoto.id || thePhoto.id <= 0) {
        Swal.fire({
          title: "Error",
          text: "ID de la foto no válido",
          icon: "error",
          timer: 3000,
        });
        return;
      }

      if (updatedPhoto) {
        Swal.fire({
          title: "Completado",
          text: "La foto se actualizó correctamente",
          icon: "success",
          timer: 3000,
        });
        navigate("/admin/photos");
      } else {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al actualizar la foto",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error inesperado al actualizar la foto",
        icon: "error",
        timer: 3000,
      });
    }
  };
  if (!photo) return <div>Cargando...</div>;

  return (
    <PhotoFormValidator
      handleUpdate={handleUpdatePhoto}
      mode={2} // modo actualización
      photo={photo}
    />
  );
};

export default PhotoUpdate;
