import { useNavigate, useParams } from "react-router-dom";

import Swal from 'sweetalert2';

import { driverService } from "services/driverService";
import { Driver } from "models/Driver";
import DriverFormValidator from "components/drivers/driverFormValidation";
import { useEffect, useState } from "react";

const FormDrivers = () => {
    const navigate = useNavigate();

    const { id: driver_id } = useParams();

    const [driver, setDriver] = useState<Driver | null>(null);

    useEffect(() => {
        const fetchDriver = async () => {
            if (!driver_id) return; // Evitar errores si el ID no está disponible
            const data = await driverService.getDriverByID(parseInt(driver_id));
            setDriver(data);
        };

        fetchDriver();
    }, [driver_id]);

    const handleCreateDriver = async (driver: Driver) => {
        try {
            const createdDriver = await driverService.createDriver(driver);
            if (createdDriver) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Usuario creado con éxito:", createdDriver);
                navigate("/admin/drivers");
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

    const handleUpdateDriver = async (driver: Driver) => {
        /*
        Any update needs an id, otherwise it can corrupt data or something
        */
        if (driver.id === null || driver.id === undefined) {
            return;
        }

        try {
            const updatedDriver = await driverService.updateDriver(driver.id, driver);
            if (updatedDriver) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/admin/drivers");
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

    if (driver_id && !driver) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div>
            {/* Formulario para crear un nuevas ordenes */}
            <h2>{driver ? "Editar" : "Crear"} driver</h2>
            <DriverFormValidator
                handleCreate={handleCreateDriver}
                handleUpdate={handleUpdateDriver}
                driver={driver}
            />
        </div>
    );
}

export default FormDrivers;