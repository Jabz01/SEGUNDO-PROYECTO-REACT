import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import AddressFormValidator from 'components/address/addresValidationForm';
import { addressService } from 'services/addressService';
import { Address } from 'models/Address';

const CreateAddress = () => {
    const navigate = useNavigate();

    // Estado para almacenar el usuario a editar

    // Lógica de creación
    const handleCreateAddress = async (address: Address) => {

        try {
            const createAddress = await addressService.createAddress(address);
            if (createAddress) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                })
                console.log("Usuario creado con éxito:", createAddress);
                navigate("/admin/orders");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de registrar su dirección",
                    icon: "error",
                    timer: 3000
                })
                console.log("Dato enviados al backend:", createAddress);
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
    return (
        <div>
            {/* Formulario para crear un nuevas ordenes */}
            <h2>Create User</h2>
            <AddressFormValidator
                handleCreate={handleCreateAddress}
                mode={1} 
            />
        </div>
    );
};

export default CreateAddress;