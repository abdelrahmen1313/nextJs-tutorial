"use client";
import React, { useEffect } from "react";

interface dataProps {
    name: string;
    message: string;
    stack: string;
    context: string;
}



export default async function Page() {




    const [data, setData] = React.useState<dataProps[]>([]);
    

    const fetchData = async () : Promise<dataProps> => {
        const response = await fetch('/api/log-error');
        const data = await response.json();
        return data;
    }
    


    useEffect(() => {
        fetchData().then((newData) => setData([...data, newData]));
   
    }, [data]);

    if (!data) {
        return (
            <div>
                <h1>Log error page</h1>
                <p>No data to display</p>

            </div>
        )
    } 
    return (
     <div>
        <h1>Log error page</h1>
        <ul>
            {data.map((item: dataProps, index: number) => (
                <li key={index}>
                    <p><strong>{item.name}</strong></p>
                    <p>{item.message}</p>
                    <p>{item.stack}</p>
                    <p>{item.context}</p>
                </li>
            ))}
        </ul>
     </div>
    )
}