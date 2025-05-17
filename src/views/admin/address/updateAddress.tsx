import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addressService } from "services/addressService";
import Swal from "sweetalert2";

import { Address } from "models/Address";
import AddressFormValidator from "components/address/addressFormValidator";

const UpdateAddress = () => {

  const { id: address_id } = useParams();

  const navigate = useNavigate();
  
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      if (!address_id) return;
      const addressData = await addressService.getAddressByID(parseInt(address_id));
      setAddress(addressData);
    };

    fetchAddress();
  }, [address_id]);

  const handleUpdateAddress = async (theAddress: Address) => {
    try {
      const updated = await addressService.updateAddress(theAddress.id || 0, theAddress);
      if (updated) {
        Swal.fire({
          title: "Completado",
          text: "Se ha actualizado correctamente la dirección",
          icon: "success",
          timer: 3000,
        });
        navigate("/admin/address"); // Redirecciona al listado de direcciones
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al actualizar la dirección",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar la dirección",
        icon: "error",
        timer: 3000,
      });
    }
  };

  if (!address) {
    return <div>Cargando...</div>;
  }

  return (
    <AddressFormValidator
      handleUpdate={handleUpdateAddress}
      mode={2}
      address={address}
    />
  );
};

export default UpdateAddress;
