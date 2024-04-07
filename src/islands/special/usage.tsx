import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);

const data = [
  { name: "12/03", questions: 22 },
  { name: "12/04", questions: 24 },
];

const barData = {
  labels: ["Questions: 3/20", "Books: 1/1"],
  datasets: [
    {
      label: "Plan usage",
      data: [20, 80],
      backgroundColor: ["#01C98B", "#FF3D46"],
      barThickness: 14,
    },
  ],
};

export default function UsageDashboard() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border border-muted rounded-md p-6">
          <h2 className="text-lg font-semibold mb-8">Today's questions: 24</h2>
          <div className="w-full h-80 lg:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#4d6d8c" />
                <YAxis stroke="#4d6d8c" />
                <CartesianGrid stroke="#444" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="questions" stroke="#8884d8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    color: "#4d6d8c",
                  }}
                />
                <Legend wrapperStyle={{ color: "#4d6d8c" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border border-muted rounded-md p-6">
          <h2 className="text-lg font-semibold mb-8">Plan usage</h2>
          <div className="w-full h-80 lg:h-96">
            <Bar
              data={barData}
              options={{
                indexAxis: "y" as const,
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right" as const,
                    labels: {
                      color: "#4d6d8c",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      display: false,
                    },
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    ticks: {
                      color: "#4d6d8c",
                    },
                    grid: {
                      color: "#444",
                      drawTicks: true,
                      tickColor: "#4d6d8c",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
