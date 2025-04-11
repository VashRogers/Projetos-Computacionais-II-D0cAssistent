import React from "react";
import { CustomDataGrid } from "../../../../Components/CustomDataGrid";
import { Stack } from "@mui/material";
import { ShowPdfComponent } from "./ShowPdfComponent";

export function PdfsDatagrid(props) {
    const columns = [
        { flex: 1, field: "title", headerName: "TÍTULO" },
        { flex: 1, field: "description", headerName: "DESCRIÇÃO" },
        { flex: 1, field: "actions", headerName:"", renderCell:(params) => {
            return(
                <Stack direction="row">
                    <ShowPdfComponent pdfId={params.row.id} path={params.row.file_path} />
                </Stack>
            )
        }}
    ];

    return <CustomDataGrid columns={columns} rows={props.rows} {...props} />;
}
