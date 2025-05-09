"use client";
import React, { useEffect, useState } from "react";

import { errorLogData } from "@/app/lib/definitions";
import { getLogs } from "@/app/lib/actions";



export default function Page() {
    const [data, setData] = React.useState<errorLogData[]>([]);
   // const [currentTask, setCurrentTask] = useState<errorLogData | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const fetchData = async () => {
                const logs = await getLogs()
                setData(logs);
                setIsLoading(false);
            };
            fetchData();
        }, 5000); // Fetch every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (

      <div className="flex flex-col p-4 space-y-4">
            <h1 className="text-2xl font-bold">Log error page</h1>
       <section className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">Current Issues</h2>
            <div className="flex flex-col space-y-2">
             {isLoading ? (<p>Loading...</p>) : 
            <ul>
            {data.map((log : errorLogData) => 

                <li
                    key={log.id}
                    className= "flex-col space-y-2 rounded-md bg-gray-50 p-4">
                           {log.id} - {log.context} - {log.error_data.message}
                    </li>
                    
                    )
                }
    
            </ul> } 
            </div>
            
            </section>

            

         {/* 
         <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => postLog(
                    "general test",

                    {
                        name: "error.code",
                        message: "This is a test error message",
                        stack: "error.printStackTrace(this.error)",
                    }
                )}
            >
                POST TEST ERROR
            </button>
*/}
         
          
        </div>    
    )


       


    
}

// FUTURE > IMPLEMENT PATH MATCHING FOR GITHUB REPO
// CURRENT -> SET DEV TO SELECT A CURRENT ISSUE TO FIX, A BUTTON TO PULL REQUEST (create new branch..)