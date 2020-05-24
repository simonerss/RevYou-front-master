import React from "react";
import { Button } from 'antd';
import { CSVLink, CSVDownload } from "react-csv";

export default function App() {

    // const cabecalho = ["firstname", "lastname", "email"];
    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    return (
        //filename={"teste"+".csv"}
        <div>
            <Button type="primary"><CSVLink  data={csvData}>Export to CSV</CSVLink></Button> <br />
            <CSVDownload filename={"teste.csv"} data={csvData} target="_blank" />
        </div>
    );
}

