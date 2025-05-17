
const ProfileCard = () => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6 dark:bg-gray-800">
      {/* Imagen centrada */}
      <div className="flex justify-center">
        <img
          src={user.avatar || "default-avatar.png"}
          alt={user.name || "Usuario"}
          className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* Información del usuario */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white">{user.name || "Usuario"}</h2>
        <p className="text-gray-500 dark:text-gray-300">{user.email || "Correo no registrado"}</p>
        <p className="text-gray-500 dark:text-gray-300">{user.phone || "Teléfono no disponible"}</p>
      </div>

      {/* Botón en la parte inferior */}
      <div className="mt-6 flex justify-center">
        <button className="w-1/3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
