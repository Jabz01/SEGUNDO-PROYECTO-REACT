import React from "react";
import SellsPieChart from "components/pieCharts/sellsPieCharts";
import IssuesPieChart from "components/pieCharts/issueTypePieChart";
import IssueStatePieChart from "components/pieCharts/issueStatePieChart";
import TempChart from "components/pieCharts/tempChart";
import AllBarCharts from "components/pieCharts/barCharts"; 

const PieCharts = () => {
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Gráficos de Ventas</h2>
          <SellsPieChart />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Tipos de Problemas Reportados</h2>
          <IssuesPieChart />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Estados de Problemas Reportados</h2>
          <IssueStatePieChart />
        </div>
      </div>

      
      <AllBarCharts /> 

      
      <div className="w-full md:w-1/2">
        <TempChart />
      </div>
    </div>
  );
};

export default PieCharts;
