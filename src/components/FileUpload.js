import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";

import axiosInstance from "../utils/axios";
import FileDisplay from "./FileDisplay";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [fileUploadStarted, setFileUploadStarted] = useState([]);

  const getFiles = (e) => {
    if (e.target.files.length > 0) {
      const tempFiles = [];
      const tempFileUploadStarted = [];
      for (let i = 0; i < e.target.files.length; i++) {
        tempFiles.push(e.target.files[i]);
        tempFileUploadStarted.push(false);
      }
      setFiles((prevState) => [...prevState, ...tempFiles]);
      setFileUploadStarted((prevState) => [
        ...prevState,
        ...tempFileUploadStarted,
      ]);
    }
  };

  const removeFile = (id) => {
    const tempFiles = files.filter((file) => file.lastModified !== id);
    const tempFileUploadStarted = fileUploadStarted;
    tempFileUploadStarted.pop();
    setFiles([...tempFiles]);
    setFileUploadStarted([...tempFileUploadStarted]);
  };

  const uploadFiles = () => {
    console.log(files);
  };

  useEffect(() => {
    console.log(fileUploadStarted);
  }, [fileUploadStarted]);
  return (
    <Container>
      <Grid container spacing={3} sx={{ my: 2 }}>
        <Grid item xs={0} sm={1} md={2}></Grid>
        <Grid item xs={12} sm={10} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ textAlign: "center", mb: "3rem" }}>
              <Typography variant='h3'>Application ID</Typography>
            </Grid>
            {files.length ? (
              files.map((file, index) => (
                <FileDisplay
                  file={file}
                  index={index}
                  removeFile={removeFile}
                  fileUploadStarted={fileUploadStarted[index]}
                />
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant='h5'>Click below to Add Files!</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <label htmlFor='upload-files'>
                <input
                  id='upload-files'
                  type='file'
                  multiple
                  name='File Uploader'
                  accept='image/*, text/*, .pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                  hidden
                  onChange={getFiles}
                />
                <Button variant='contained' component='span'>
                  {files.length ? "Add more Files" : "Add Files"}
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", mt: "3rem" }}>
              <Typography variant='h5'>
                Click below (Upload Files) after adding Both Sides of Card
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                color='success'
                variant='contained'
                disabled={files.length ? false : true}
                onClick={uploadFiles}
              >
                Upload Files
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={1} md={2}></Grid>
      </Grid>
    </Container>
  );
}
