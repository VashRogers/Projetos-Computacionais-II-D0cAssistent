import React, { useState, useMemo, useRef } from "react";
import {
    Button,
    InputBase,
    LinearProgress,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { IoCloudUpload } from "react-icons/io5";
import styled from "@emotion/styled";
import { useToast } from "../../Hooks/useToast";
import { useResponsive } from "../../Hooks/useResponsive";
import { FaFileCircleMinus } from "react-icons/fa6";
import Api from "../../api";

export function FileInput({ name, id, files, setValue, errors, clearErrors }) {
    const [isLoading, setIsLoading] = useState(false);
    const { toastOpen } = useToast();
    const { isDesktop } = useResponsive("sm");
    const fileInputRef = useRef(null);

    const HiddenInput = useMemo(
        () =>
            styled("input")({
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: 1,
            }),
        []
    );

    const handleFileChange = async (event) => {
        const newFiles = Array.from(event.target.files);

        if (files.length + newFiles.length > 10) {
            toastOpen("error", "O limite de anexos é de 10 arquivos!");
            return;
        }

        const formData = new FormData();
        newFiles.forEach((file) => {
            formData.append("files", file);
        });

        try {
            setIsLoading(true);

            const response = await Api.post("/files/upload", formData);

            if (response.status === 200) {
                const uploadedFiles = response.data.files.map((file) => ({
                    name: file.original_name,
                    uniqueName: file.unique_name,
                    path: file.path,
                    modelId: id,
                }));

                setValue(`${name}`, [...files, ...uploadedFiles]);
                clearErrors(name);
            } else {
                toastOpen("error", "Erro ao enviar os arquivos.");
            }
        } catch (error) {
            toastOpen("error", error.response.data.message);
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemoveFile = async (index) => {
        const fileToRemove = files[index];

        try {
            setIsLoading(true);

            const response = await Api.post("/files/delete", {
                path: fileToRemove.path,
                process: false
            });
            fileInputRef.current.value = "";
            if (response.status === 200) {
                setValue(name, [...files.filter((_, i) => i !== index)]);
            } else {
                setIsLoading(false);
                toastOpen("error", "Erro ao remover o arquivo.");
            }
        } catch (error) {
            setIsLoading(false);
            toastOpen("error", error.response.data.message);
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const renderedFiles = useMemo(
        () =>
            files.map((file, index) => (
                <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    sx={{ marginBottom: "5px" }}
                    flexGrow={1}
                >
                    <Paper
                        variant="outlined"
                        sx={{
                            display: "flex",
                            border: "1px solid #161616",
                            alignItems: "center",
                            width: "100%",
                            height: 50,
                            paddingLeft: 1,
                        }}
                    >
                        <Button
                            color="error"
                            onClick={() => handleRemoveFile(index)}
                            variant="contained"
                            disabled={isLoading}
                            tabIndex={-1}
                            startIcon={isDesktop ? <FaFileCircleMinus /> : null}
                            size={isDesktop ? "small" : "large"}
                        >
                            {isDesktop ? (
                                "Remover arquivo"
                            ) : (
                                <FaFileCircleMinus />
                            )}
                        </Button>
                        <InputBase
                            value={file.name}
                            readOnly
                            placeholder="Nenhum arquivo selecionado"
                            sx={{ ml: 1, fontSize: 15, flexGrow: 1 }}
                        />
                    </Paper>
                </Stack>
            )),
        [files, isDesktop, isLoading]
    );

    return (
        <Stack direction="column" sx={{ width: "100%" }}>
            {renderedFiles}

            {files.length < 10 && (
                <>
                    <Stack direction="row" alignItems="center" flexGrow={1}>
                        <Paper
                            variant="outlined"
                            sx={{
                                display: "flex",
                                border: "1px solid #161616",
                                alignItems: "center",
                                width: "100%",
                                height: 50,
                                paddingLeft: 1,
                            }}
                        >
                            <Button
                                color="primary"
                                component="label"
                                variant="contained"
                                disabled={isLoading}
                                tabIndex={-1}
                                startIcon={isDesktop ? <IoCloudUpload /> : null}
                                size={isDesktop ? "small" : "large"}
                            >
                                <HiddenInput
                                    key={files.length}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    type="file"
                                    multiple
                                />
                                {isDesktop ? (
                                    "Adicionar arquivos"
                                ) : (
                                    <IoCloudUpload />
                                )}
                            </Button>
                            <InputBase
                                readOnly
                                placeholder="Selecione arquivos para anexar"
                                sx={{ ml: 1, fontSize: 15, flexGrow: 1 }}
                            />
                        </Paper>
                    </Stack>
                    {errors[name] && (
                        <Typography
                            color="error"
                            sx={{ height: "0px", fontSize: "12px" }}
                        >
                            {errors[name]?.message}
                        </Typography>
                    )}
                </>
            )}

            {isLoading && (
                <LinearProgress
                    sx={{
                        width: "100%",
                        marginBottom: "15px",
                        marginTop: "-10px",
                    }}
                />
            )}
        </Stack>
    );
}
