import React from "react";
import {
    DataGrid as DatagridMui,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { Box } from "@mui/material";

function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
            display="flex"
            justifyContent="end"
        >
            <GridToolbarQuickFilter />
        </Box>
    );
}

export function CustomDataGrid(props) {
    return (
        <DatagridMui
            autoHeight
            pagination
            rowsPerPageOptions={[15]}
            disableColumnMenu
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            slots={{ toolbar: QuickSearchToolbar }}
            sx={{
                bgcolor: "background.default",
                "& .MuiDataGrid-cell": {
                    py: "8px",
                },
            }}
            getRowHeight={() => "auto"}
            {...props}
        />
    );
}
