import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import env from 'env/env';
import { Order } from 'models/Order';
import { ApexOptions } from 'apexcharts';

const API_URL = env.MOCK_SERVER;

const SellsPieChart = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(`${API_URL}/orders`);
        console.log(response.data);
        
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading chart data...</p>;
  if (!orders.length) return <p>No data to display</p>;

  // Procesar datos usando solo menu_id
  const menuSells: Record<number, { nombre: string; total: number }> = {};

  orders.forEach(order => {
    if (!order.menu_id || !order.total_price) return;

    const menuId = order.menu_id;
    const nombre = `Menú ${menuId}`;
    const totalVenta = order.total_price;

    if (!menuSells[menuId]) {
      menuSells[menuId] = { nombre, total: 0 };
    }

    menuSells[menuId].total += totalVenta;
  });

  const labels = Object.values(menuSells).map(item => item.nombre);
  const series = Object.values(menuSells).map(item => item.total);

  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels,
    title: {
      text: 'Ventas totales por menú',
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="pie" width={500} />
    </div>
  );
};

export default SellsPieChart;
