import React from "react";
import { CustomDataGrid } from "../../../../Components/CustomDataGrid";


export function TextDatagrid(props) {
    const columns = [
        { flex: 1, field: "title", headerName: "TÍTULO" },
        { flex: 1, field: "text", headerName: "ANOTAÇÃO" },
    ];

    return <CustomDataGrid columns={columns} rows={props.rows} {...props} />;
}
