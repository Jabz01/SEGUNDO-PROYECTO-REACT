import Swal from 'sweetalert2';
import { addressService } from 'services/addressService';
import AddressFormValidator from 'components/address/addressFormValidator';  // Asegúrate de tener el AddressFormValidator
import { Address } from 'models/Address';
import { useNavigate, useParams } from 'react-router-dom';

const CreateAddress = () => {

    const navigate = useNavigate();

    const { order_id: id } = useParams();

    // Lógica de creación de dirección
    const handleCreateAddress = async (address: Address) => {
        try {
            // Crear la dirección
            const createdAddress = await addressService.createAddress(
                { ...address, 
                    order_id: parseInt(id!) }                     
            );

            if (createdAddress) {
                Swal.fire({
                    title: "Completado",
                    text: "La dirección se ha creado correctamente.",
                    icon: "success",
                    timer: 3000,
                });
                console.log("Dirección creada con éxito:", createdAddress);
                navigate("/admin/orders");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear la dirección.",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear la dirección.",
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Dirección</h2>
            <AddressFormValidator
                handleCreate={handleCreateAddress}
                mode={1} // Modo de creación
            />
        </div>
    );
};

export default CreateAddress;
