import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import env from 'env/env';
import { ApexOptions } from 'apexcharts';
import { Issue } from 'models/Issue';

const API_URL = env.MOCK_SERVER;

const IssuesPieChart = () => {
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

  // Count issue types
  const issueTypeCount: Record<string, number> = {};
  issues.forEach(issue => {
    const type = issue.issue_type?.toLowerCase().trim() || 'unknown';
    issueTypeCount[type] = (issueTypeCount[type] || 0) + 1;
  });

  const labels = Object.keys(issueTypeCount);
  const series = Object.values(issueTypeCount);

  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels,
    title: {
      text: 'Issue Type Distribution',
    },
    legend: {
      position: 'bottom',
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Chart options={options} series={series} type="pie" width="100%" />
    </div>
  );
};

export default IssuesPieChart;