import React from "react";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { shiftService } from "services/shiftService";
import { Shift } from "models/Shift";
import { ApexOptions } from "apexcharts";

const AllBarCharts = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const data = await shiftService.listShifts();
        setShifts(data);
      } catch (error) {
        console.error("Error obteniendo turnos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

if (loading) return <p>Cargando datos...</p>;
if (!shifts.length) return <p>No hay datos para mostrar.</p>;

// 🔹 Procesar datos
const driverShiftCount: Record<number, number> = {};
const motorcycleShiftCount: Record<number, number> = {};
const shiftStatusCount = { active: 0, completed: 0 };

shifts.forEach((shift) => {
  const driverId = shift.driver.id;
  const motorcycleId = shift.motorcycle.id;

  driverShiftCount[driverId] = (driverShiftCount[driverId] || 0) + 1;
  motorcycleShiftCount[motorcycleId] = (motorcycleShiftCount[motorcycleId] || 0) + 1;

  if (shift.status === "active") {
    shiftStatusCount.active++;
  } else if (shift.status === "completed") {
    shiftStatusCount.completed++;
  }
});
  // 🔹 Configuración de gráficos
  const driverOptions: ApexOptions = {
    chart: { type: "bar" },
    xaxis: { categories: Object.keys(driverShiftCount) },
    title: { text: "Turnos por Conductor" },
  };

  const motorcycleOptions: ApexOptions = {
    chart: { type: "bar" },
    xaxis: { categories: Object.keys(motorcycleShiftCount) },
    title: { text: "Turnos por Motocicleta" },
  };

  const statusOptions: ApexOptions = {
    chart: { type: "bar" },
    xaxis: { categories: ["Activos", "Completados"] },
    colors: ["#ff0000", "#008000"],
    title: { text: "Turnos por Estado" },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
      <div className="w-full">
        <Chart options={driverOptions} series={[{ name: "Turnos", data: Object.values(driverShiftCount) }]} type="bar" width={350} />
      </div>
      <div className="w-full">
        <Chart options={motorcycleOptions} series={[{ name: "Turnos", data: Object.values(motorcycleShiftCount) }]} type="bar" width={350} />
      </div>
      <div className="w-full">
        <Chart options={statusOptions} series={[{ name: "Turnos", data: Object.values(shiftStatusCount) }]} type="bar" width={350} />
      </div>
    </div>
  );
};

export default AllBarCharts;