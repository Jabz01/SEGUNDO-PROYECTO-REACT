import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Shift } from "models/Shift";
import { shiftService } from "services/shiftService";
import { driverService } from "services/driverService";
import { motorcycleService } from "services/motorcycleService";
import { useNavigate } from "react-router-dom";
import { Driver } from "models/Driver";
import { Motorcycle } from "models/Motorcycle";

const ShiftForm = ({ shift }: { shift?: Shift }) => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [activeShifts, setActiveShifts] = useState<Shift[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driverData = await driverService.getDrivers();
        const motorcycleData = await motorcycleService.getMotorcycles();
        const shiftsData = await shiftService.getShifts(); 
        setDrivers(driverData);
        setMotorcycles(motorcycleData);
        setActiveShifts(shiftsData.filter(shift => shift.status === "active"));
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  const initialValues: Omit<Shift, "id"> = {
    driver: shift?.driver || { 
      id: 0, 
      name: "", 
      email: "", 
      phone: "", 
      license_number: "", 
      status: "available" 
    },  
    motorcycle: shift?.motorcycle || { 
      id: 0, 
      brand: "", 
      license_plate: "", 
      year: new Date().getFullYear(), 
      status: "available" 
    },  
    start_time: shift?.start_time || new Date(),
    end_time: shift?.end_time || null,
    status: shift?.status || "active",
    created_at: shift?.created_at || new Date(),
  };

  const validationSchema = Yup.object({
    driver: Yup.object().shape({
      id: Yup.number().required("Debes seleccionar un conductor"),
    }),
    motorcycle: Yup.object().shape({
      id: Yup.number().required("Debes seleccionar una moto"),
    }),
    start_time: Yup.date().required("La fecha de inicio es obligatoria"),
    end_time: Yup.date().nullable().min(Yup.ref("start_time"), "La fecha de finalización debe ser posterior a la de inicio"),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={async (values) => {

      // Verificar si el conductor ya tiene un turno activo
      const existingDriverShift = activeShifts.find(shift => shift.driver.id === values.driver.id);
      if (existingDriverShift) {
        Swal.fire("Error", "Este conductor ya tiene un turno activo.", "error");
        return;
      }

      // Verificar si la moto ya está en un turno activo
      const existingMotorcycleShift = activeShifts.find(shift => shift.motorcycle.id === values.motorcycle.id);
      if (existingMotorcycleShift) {
        Swal.fire("Error", "Esta moto ya está en otro turno activo.", "error");
        return;
      }

      await shiftService.createShift(values);
      Swal.fire("Éxito", "Turno creado con éxito.", "success");
      navigate("/admin/shifts");
    }}>
      {({ values, setFieldValue }) => (
        <Form className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
          
          {/* Conductor (Lista desplegable) */}
          <div>
            <label htmlFor="driver.id" className="block text-lg font-medium text-gray-700">Conductor</label>
            <Field as="select" name="driver.id" className="w-full rounded-md p-2" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("driver.id", Number(e.target.value))}>
              <option value="">Seleccione un conductor...</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>{driver.name} ({driver.license_number})</option>
              ))}
            </Field>
            <ErrorMessage name="driver.id" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Moto (Lista desplegable) */}
          <div>
            <label htmlFor="motorcycle.id" className="block text-lg font-medium text-gray-700">Moto</label>
            <Field as="select" name="motorcycle.id" className="w-full rounded-md p-2" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("motorcycle.id", Number(e.target.value))}>
              <option value="">Seleccione una moto...</option>
              {motorcycles.map((motorcycle) => (
                <option key={motorcycle.id} value={motorcycle.id}>{motorcycle.brand} - {motorcycle.license_plate}</option>
              ))}
            </Field>
            <ErrorMessage name="motorcycle.id" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Fecha de inicio */}
          <div>
            <label htmlFor="start_time" className="block text-lg font-medium text-gray-700">Inicio</label>
            <Field type="datetime-local" name="start_time" className="w-full rounded-md p-2" />
            <ErrorMessage name="start_time" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Fecha de fin */}
          <div>
            <label htmlFor="end_time" className="block text-lg font-medium text-gray-700">Fin (opcional)</label>
            <Field type="datetime-local" name="end_time" className="w-full rounded-md p-2" />
            <ErrorMessage name="end_time" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-lg font-medium text-gray-700">Estado</label>
            <Field as="select" name="status" className="w-full rounded-md p-2">
              <option value="active">Activo</option>
              <option value="completed">Completado</option>
            </Field>
            <ErrorMessage name="status" component="p" className="text-red-500 text-sm" />
          </div>

          {/* Botón */}
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            {shift ? "Actualizar Turno" : "Crear Turno"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ShiftForm;