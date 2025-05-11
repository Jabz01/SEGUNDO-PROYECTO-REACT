import { useNavigate, useParams } from "react-router-dom";

import Swal from 'sweetalert2';

import { motorcycleService } from "services/motorcycleService";
import { Motorcycle } from "models/Motorcycle";

import MotorcycleFormValidator from "components/motorcycles/motorcycleFormValidation";

import { useEffect, useState } from "react";

const FormMotorcycles = () => {
    const navigate = useNavigate();

    const { id: motorcycle_id } = useParams();

    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

    useEffect(() => {
        const fetchMotorcycle = async () => {
            if (!motorcycle_id) return; // Evitar errores si el ID no está disponible
            const data = await motorcycleService.getMotorcycleByID(parseInt(motorcycle_id));
            setMotorcycle(data);
        };

        fetchMotorcycle();
    }, [motorcycle_id]);

    const handleCreateMotorcycle = async (motorcycle: Motorcycle) => {
        try {
            const createdMotorcycle = await motorcycleService.createMotorcycle(motorcycle);
            if (createdMotorcycle) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Usuario creado con éxito:", createdMotorcycle);
                navigate("/admin/motorcycles");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            })
        }
    };

    const handleUpdateMotorcycle = async (motorcycle: Motorcycle) => {
        /*
        Any update needs an id, otherwise it can corrupt data or something
        */
        if (motorcycle.id === null || motorcycle.id === undefined) {
            return;
        }

        try {
            const updatedMotorcycle = await motorcycleService.updateMotorcycle(motorcycle.id, motorcycle);
            if (updatedMotorcycle) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/admin/motorcycles");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (motorcycle_id && !motorcycle) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div>
            {/* Formulario para crear un nuevas ordenes */}
            <h2>{motorcycle ? "Editar" : "Crear"} moto</h2>
            <MotorcycleFormValidator
                handleCreate={handleCreateMotorcycle}
                handleUpdate={handleUpdateMotorcycle}
                motorcycle={motorcycle}
            />
        </div>
    );
}

export default FormMotorcycles;