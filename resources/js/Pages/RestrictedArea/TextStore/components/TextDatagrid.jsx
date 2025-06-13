import React, { useState } from "react";
import { CustomDataGrid } from "../../../../Components/CustomDataGrid";
import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
} from "@mui/material";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Api from "../../../../api";
import { router } from "@inertiajs/react";

export function TextDatagrid(props) {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingText, setEditingText] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editTextContent, setEditTextContent] = useState("");

    const handleEdit = (row) => {
        setEditingText(row);
        setEditTitle(row.title);
        setEditTextContent(row.text);
        setEditDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja deletar esta anotação?")) {
            Api.delete(`/texts/${id}`)
                .then(() => {
                    router.reload();
                })
                .catch((error) => {
                    console.error("Erro ao deletar:", error);
                    alert("Erro ao deletar a anotação");
                });
        }
    };

    const handleSaveEdit = () => {
        if (!editTitle.trim() || !editTextContent.trim()) {
            alert("Título e anotação são obrigatórios");
            return;
        }

        Api.put(`/texts/${editingText.id}`, {
            title: editTitle,
            text: editTextContent,
        })
            .then(() => {
                setEditDialogOpen(false);
                setEditingText(null);
                setEditTitle("");
                setEditTextContent("");
                router.reload();
            })
            .catch((error) => {
                console.error("Erro ao editar:", error);
                alert("Erro ao editar a anotação");
            });
    };

    const handleCloseEdit = () => {
        setEditDialogOpen(false);
        setEditingText(null);
        setEditTitle("");
        setEditTextContent("");
    };

    const columns = [
        { flex: 1, field: "title", headerName: "TÍTULO" },
        { flex: 1, field: "text", headerName: "ANOTAÇÃO" },
        {
            field: "actions",
            headerName: "AÇÕES",
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        onClick={() => handleEdit(params.row)}
                        color="primary"
                        size="small"
                    >
                        <FiEdit />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDelete(params.row.id)}
                        color="error"
                        size="small"
                    >
                        <FiTrash2 />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <>
            <CustomDataGrid columns={columns} rows={props.rows} {...props} />

            <Dialog
                open={editDialogOpen}
                onClose={handleCloseEdit}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Editar Anotação</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Título"
                        fullWidth
                        variant="outlined"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Anotação"
                        fullWidth
                        multiline
                        rows={6}
                        variant="outlined"
                        value={editTextContent}
                        onChange={(e) => setEditTextContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancelar</Button>
                    <Button onClick={handleSaveEdit} variant="contained">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
