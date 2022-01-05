import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Button,
  Container,
  createFilterOptions,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

import Success from './Success';
import Fail from './Fail';

const filterOptions = createFilterOptions({
  stringify: ({ FirstName, LastName, MiddleName }) =>
    `${FirstName} ${LastName} ${MiddleName}`,
});

const dropbox = {
  outline: '2px dashed grey',
  outlineOffset: '-10px',
  background: 'lightcyan',
  color: 'dimgray',
  padding: '10px 10px',
  minHeight: '200px',
  position: 'relative',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'center',
  marginLeft: '25px',
};

const inputFile = {
  opacity: '0',
  width: '100%',
  height: '200px',
  position: 'absolute',
  cursor: 'pointer',
  marginLeft: '-50%',
};

export default function Form() {
  const printRef = useRef();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState(undefined);
  const [error, setError] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [files, setFiles] = useState([]);
  const [isInitital, setIsInitial] = useState(false);

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [applicationID, setApplicationID] = useState('');
  const [errorMessage, setErrorMessage] = useState('Test');

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    if (files.length) setIsInitial(false);
    else setIsInitial(true);
  }, [files]);

  useEffect(() => {
    axios
      .get(`https://info.alachuacounty.us/incentive-program/api/employees`)
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const getFiles = (e) => {
    if (e.target.files.length > 0) {
      setFileUploadError(false);
      let tempFiles = [];
      for (let i = 0; i < e.target.files.length; i++)
        tempFiles.push(e.target.files[i]);
      setFiles((prevState) => [...prevState, ...tempFiles]);
    } else setFileUploadError(true);
  };

  const createThumbnail = (file) => {
    const url = URL.createObjectURL(file);
    return url;
  };

  const removeFile = (id) => {
    const tempFiles = files.filter((file) => file.lastModified !== id);
    setFiles([...tempFiles]);
    if (tempFiles.length === 0) setIsInitial(true);
  };

  const onSubmit = (data) => {
    if (files.length === 0) {
      setFileUploadError(true);
      return;
    }
    let filteredData = [];
    if (searchText) {
      filteredData = employees.filter((employee) => {
        if (employee.EmployeeID === searchText) return employee;
        else return null;
      });
      if (filteredData.length) {
        axios
          .post(
            'https://info.alachuacounty.us/incentive-program/api/submitVaccinationForm',
            //`http://localhost:8001/api/submitVaccinationForm`,
            {
              filteredData,
              data,
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.data) {
              setApplicationID(response.data);
              setSuccess(true);
              files.forEach((file) => {
                let formData = new FormData();
                formData.append('itemID', response.data);
                formData.append('fileObject', file);

                axios({
                  method: 'post',
                  //url: `http://localhost:8001/uploadFile`,
                  url: `https://info.alachuacounty.us/incentive-program/uploadFile`,
                  data: formData,
                  headers: { 'Content-Type': 'multipart/form-data' },
                });
              });
            }
          })
          .catch((error) => {
            console.log(error);
            setFail(true);
            setErrorMessage(error.message);
          });
      } else {
        setFail(true);
        setErrorMessage(
          'There is some issue with submitting the form please contact ITS to get this resolved.'
        );
      }
    } else setError(true);
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ my: 2 }}>
          <Grid item xs={0} sm={1} md={2}></Grid>
          <Grid item xs={12} sm={10} md={8}>
            <Grid container spacing={3}>
              {!success && !fail && (
                <>
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant='h4'>
                      COVID 19 Vaccination Incentive 2022
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      fullWidth
                      freeSolo
                      id='name'
                      options={employees}
                      onInputChange={(event) => {
                        if (event.currentTarget.children[0]) {
                          setError(false);
                          setSearchText(
                            event.currentTarget.children[0].innerHTML
                          );
                        } else {
                          setSearchText('');
                          setError(true);
                        }
                        return event.target;
                      }}
                      filterOptions={filterOptions}
                      getOptionLabel={(option) => {
                        return `${option.FirstName} ${option.MiddleName} ${option.LastName} - (${option.Title}, ${option.Department})`;
                      }}
                      renderOption={(props, option) => {
                        return (
                          <div {...props}>
                            <span style={{ display: 'none' }}>
                              {option.EmployeeID}
                            </span>
                            <div>
                              {option.FirstName} {option.MiddleName}{' '}
                              {option.LastName} - ({option.Title},{' '}
                              {option.Department})
                            </div>
                          </div>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size='small'
                          variant='outlined'
                          label='Employee Name'
                          InputProps={{ ...params.InputProps }}
                          fullWidth
                          error={error}
                          helperText={error && 'Required*'}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl
                      variant='outlined'
                      fullWidth
                      error={!!errors.Type}
                    >
                      <InputLabel id='type'>Vaccination Type</InputLabel>
                      <Select
                        name='Type'
                        labelId='type'
                        defaultValue=''
                        id='type'
                        label='Vaccination Type'
                        {...register('Type', { required: true })}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='Booster'>Booster</MenuItem>
                        <MenuItem value='First Shot'>First Shot</MenuItem>
                        <MenuItem value='Second Shot'>Second Shot</MenuItem>
                      </Select>
                      {errors.Department && (
                        <FormHelperText>
                          Vaccination Type Required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6' component='h2'>
                      Upload Both Sides of Card
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={dropbox}>
                    <input
                      type='file'
                      multiple
                      name='uploadFiles'
                      accept='image/*, text/*, .pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                      style={inputFile}
                      onChange={getFiles}
                    />
                    {isInitital && (
                      <p>
                        Drag your file(s) here to begin
                        <br /> or click to Browse
                      </p>
                    )}
                    {files.map((file) => (
                      <>
                        <Button
                          title='remove'
                          sx={{ elevation: '2' }}
                          onClick={() => removeFile(file.lastModified)}
                        >
                          <CloseIcon />
                        </Button>
                        <img
                          src={createThumbnail(file)}
                          width='15%'
                          alt={file.name}
                        />
                      </>
                    ))}
                  </Grid>

                  {fileUploadError === true ? (
                    <Grid item xs={12}>
                      <Alert severity='error'>*Required at least 1 file</Alert>
                    </Grid>
                  ) : null}

                  <Grid item xs={12}>
                    <Controller
                      name='Comments'
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <FormControl variant='outlined' fullWidth>
                          <InputLabel htmlFor='comments'>Comments</InputLabel>
                          <OutlinedInput
                            id='comments'
                            value={value}
                            onChange={onChange}
                            label='Comments'
                            multiline
                            rows={4}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      style={{ marginTop: '30px', width: '30%' }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </>
              )}
              {success && (
                <>
                  <Success
                    applicationID={applicationID}
                    componentRef={printRef}
                  />
                  <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Button variant='contained' onClick={handlePrint}>
                      Print
                    </Button>
                  </div>
                </>
              )}
              {fail && (
                <>
                  <Fail errorMessage={errorMessage} componentRef={printRef} />
                  <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Button variant='contained' onClick={handlePrint}>
                      Print
                    </Button>
                  </div>
                </>
              )}
              <Grid item xs={0} sm={1} md={2}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
