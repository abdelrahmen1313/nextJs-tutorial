"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,

} from "recharts";


const data = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2300 },
  { month: "Jun", revenue: 6000 },
  { month: "Jul", revenue: 3500 },
  { month: "Aug", revenue: 3700 },
  { month: "Sep", revenue: 2500 },
  { month: "Oct", revenue: 2800 },
  { month: "Nov", revenue: 3000 },
  { month: "Dec", revenue: 4800 },
];

export default function Page() {
  return (
    <main>
      <h1>Revenue Page</h1>
      <section>
        <div className="w-full md:col-span-4 flex flex-col mt-8">
          <h2 className="text-2xl font-bold mb-4">Default</h2>
          <ResponsiveContainer width={"100%"} height={300}>
          <LineChart width={900} height={300} data={data}
           margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="8 8" vertical={false} 
           />
            <XAxis dataKey="month" />
            <YAxis tickCount={6}  />
            <Tooltip />
          </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      
    </main>
  );
}
