import React from 'react';
import SellsPieChart from 'components/pieCharts/sellsPieCharts';
import IssuesPieChart from 'components/pieCharts/issueTypePieChart';
import IssueStatePieChart from 'components/pieCharts/issueStatePieChart';

const PieCharts = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start p-4">
            <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Gráficos de Ventas</h2>
                <SellsPieChart />
            </div>
            <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Gráfico de tipos de problemas reportados</h2>
                <IssuesPieChart />
            </div>
            <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Gráfico de estados de problemas reportados</h2>
                <IssueStatePieChart />
            </div>
        </div>
    );
};

export default PieCharts;
