import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import env from 'env/env';
import { ApexOptions } from 'apexcharts';
import { Issue } from 'models/Issue';

const API_URL = env.MOCK_SERVER;

const IssueStatePieChart = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get<Issue[]>(`${API_URL}/issues`);
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <p>Loading chart data...</p>;
  if (!issues.length) return <p>No data available</p>;

  // Count issue statuses
  const statusCount: Record<string, number> = {};
  issues.forEach(issue => {
    const status = issue.status?.toLowerCase().trim() || 'unknown';
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const labels = Object.keys(statusCount);
  const series = Object.values(statusCount);

  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels,
    title: {
      text: 'Issue Status Distribution',
    },
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      formatter: (val: number) => `${val.toFixed(1)}%`,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toFixed(0)} issues`,
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Chart options={options} series={series} type="pie" width="100%" />
    </div>
  );
};

export default IssueStatePieChart;
