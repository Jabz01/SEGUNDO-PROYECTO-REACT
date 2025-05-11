import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


import Swal from "sweetalert2";

import { Address } from "models/Address";
import { addressService } from "services/addressService";
import AddressFormValidator from "components/address/addresValidationForm";


const UpdateAddress = () => {
    const { id: address_id } = useParams(); 
    
    const navigate = useNavigate();
    const [ Address, setAddress] = useState<Address | null>(null);


    useEffect(() => {
        console.log("Id->"+address_id)
        const fetchAddress = async () => {
            if (!address_id) return; // Evitar errores si el ID no está disponible
            const AddressData = await addressService.getAddressByID(parseInt(address_id));
            setAddress(AddressData);
        };

        fetchAddress();
    }, [address_id]);

    const handleUpdateAddress = async (theAddress: Address) => {
        try {
            const updatedUser = await addressService.updateAddress(theAddress.id || 0, theAddress);
            if (updatedUser) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente su dirección",
                    icon: "success",
                    timer: 3000
                });
                navigate("/admin/orders"); 
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar su dirección",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar su dirección",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!Address) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <>
            <AddressFormValidator
                handleUpdate={handleUpdateAddress}
                mode={2} // 2 significa actualización
                address={Address}
            />
        </>
    );
};

export default UpdateAddress;