"use client";
import React, { useEffect } from "react";


import { errorLogData } from "@/app/lib/definitions";
import { getLogs, postLog } from "@/app/lib/actions";

// this need websockets


export default function Page() {

   /* const InitialData = {
        name: "INITIAL",
        message: "INITIALPT",
        stack: "--XXX--xx",
        context: "Error logging in",
    } */

    const [data, setData] = React.useState<errorLogData[]>([]);


    useEffect(() => {
        getLogs().then((newData) => setData([...newData]));
   
    }, []);



    if (!data) {
        return (
            <div>
                <h1>Log error page</h1>
                <p>No data to display</p>

            </div>
        )
    } 
    return (
     <div className="flex flex-col">
        <h1 className="text-2xl">Log error page</h1>
<table className="min-w-full">   
    <thead className="bg-gray-50">
    <tr className="border-b">
        <th className="px-6 py-4">Name</th>
        <th className="px-6 py-4">Message</th>
        <th className="px-6 py-4">Stack</th>
        <th className="px-6 py-4">Context</th>
    </tr>
    </thead>
    <tbody>
     {data.map((item: errorLogData, index: number) => (
                <tr key={index} className="border-b ">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.message}</td>
                    <td className="px-6 py-4">{item.stack}</td>
                    <td className="px-6 py-4">{item.context}</td>
                </tr>
            ))}
    </tbody>
        </table>


        <button className="btn btn-primary" onClick={() => postLog(
            {
                name: "INITIAL",
                message: "INITIALPT",
                stack: "--XXX--xx",
                context: "Error logging in",
            }
        )}>POST</button>

     </div>

    )
}