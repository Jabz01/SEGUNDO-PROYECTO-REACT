import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import env from 'env/env';
import { ApexOptions } from 'apexcharts';

const API_URL = "https://c1637f93-1060-4446-a5ad-5bcc2b7d843f.mock.pstmn.io";

const TempChart = () => {

    const [series, setSeries] = useState([]);
    const [series_1, setSeries_1] = useState([]);
    const [series_2, setSeries_2] = useState([]);

    const options: ApexOptions = {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    };

    const options_1: ApexOptions = {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Issues reported',
            align: 'left'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    };

    const options_2: ApexOptions = {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Some sell data',
            align: 'left'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let data_0 = await axios.get<any>(API_URL + "/data_0");
                let data_1 = await axios.get<any>(API_URL + "/data_1");
                let data_2 = await axios.get<any>(API_URL + "/data_2");

                setSeries([{ name: "Sales", data: data_0.data}])
                setSeries_1([{ name: "Issues", data: data_1.data}])
                setSeries_2([{ name: "Sales", data: data_2.data}])
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    if ([series, series_1, series_2].includes([]))
    {
        return (
            <div>cargando</div>
        )
    }

    return (
        <div>
            <Chart type="line" options={options} series={series} width={500} />
            <Chart type="line" options={options_1} series={series_1} width={500} />
            <Chart type="line" options={options_2} series={series_2} width={500} />
        </div>
    );
};

export default TempChart;
