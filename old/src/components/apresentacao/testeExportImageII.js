import React from "react";
import { Button } from 'antd';
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default function App() {

    const externData = [
        [
            { value: "H1" },
            { value: "Bold" },
            { value: "Red" }
        ],
        [
            { value: "H2" },
            { value: "underline" },
            { value: "Blue" }
        ],
        [
            { value: "H3" },
            { value: "italic" },
            { value: "Green" }
        ],
        [
            { value: "H4" },
            { value: "strike" },
            { value: "Orange" }
        ],
        [
            { value: "H5" },
            { value: "outline" },
            { value: "Yellow" }
        ],
        [
            { value: "H6" },
            { value: "shadow" },
            { value: "Light Blue" }
        ]
    ]

    const externColumns = [
        { title: "Headings", width: { wpx: 80 } },
        { title: "Text Style", width: { wch: 40 } },
        { title: "Colors", width: { wpx: 90 } }
    ];

    const multiDataSet = [{ columns: externColumns, data: externData }];

    return (
        <div>
            <ExcelFile element={<Button type="primary" size="small">Export to XLSX</Button>}>
                <ExcelSheet dataSet={multiDataSet} name="Organization" />
            </ExcelFile>
        </div>
    );
}



    // const multiDataSetOLD = [
    //     {
    //         columns: [
    //             { title: "Headings", width: { wpx: 80 } }, //pixels width
    //             { title: "Text Style", width: { wch: 40 } }, //char width
    //             { title: "Colors", width: { wpx: 90 } }
    //         ],
    //         data: [
    //             [
    //                 { value: "H1" },
    //                 { value: "Bold" },
    //                 { value: "Red" }
    //             ],
    //             [
    //                 { value: "H2" },
    //                 { value: "underline" },
    //                 { value: "Blue" }
    //             ],
    //             [
    //                 { value: "H3" },
    //                 { value: "italic" },
    //                 { value: "Green" }
    //             ],
    //             [
    //                 { value: "H4" },
    //                 { value: "strike" },
    //                 { value: "Orange" }
    //             ],
    //             [
    //                 { value: "H5" },
    //                 { value: "outline" },
    //                 { value: "Yellow" }
    //             ],
    //             [
    //                 { value: "H6" },
    //                 { value: "shadow" },
    //                 { value: "Light Blue" }
    //             ]
    //         ]
    //     }
    // ];
