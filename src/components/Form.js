import { useState } from 'react';
import {
  Alert,
  Container,
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
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { DropzoneArea } from 'material-ui-dropzone';

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [fileUploadError, setFileUploadError] = useState(false);
  const [files, setFiles] = useState([]);

  return (
    <Container>
      <Grid container spacing={3} sx={{ my: 2, }}>
        <Grid item xs={0} sm={1} md={2}></Grid>
        <Grid item xs={12} sm={10} md={8}>

          <Grid container spacing={3}>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography component='h2' variant='h4'>
              COVID 19 Vaccination Incentive 2022
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name='Name'
              label='Full Name'
              id='name'
              error={!!errors.name}
              helperText={errors.name && 'Name is required'}
              {...register('Name', { required: true })}
              variant='outlined'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant='outlined' fullWidth error={!!errors.Department}>
              <InputLabel id='department'>Department</InputLabel>
              <Select
                name='Department'
                labelId='department'
                defaultValue=''
                id='department'
                label='Department'
                {...register('Department', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='Board of County Commissioners'>
                  Board of County Commissioners
                </MenuItem>
                <MenuItem value='Library District'>Library District</MenuItem>
                <MenuItem value='Retiree'>Retiree</MenuItem>
              </Select>
              {errors.Department && (
                <FormHelperText>Department required</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant='outlined' fullWidth error={!!errors.Type}>
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
                <FormHelperText>Vaccination Type Required</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6' component='h2'>
              Supporting Attachments (Proof of Vaccination)
            </Typography>
            <DropzoneArea
              filesLimit={6}
              maxFileSize={5000000}
              acceptedFiles={[
                'image/jpeg',
                'image/png',
                'application/pdf',
                'application/msword',
                'image/gif',
                'image/bmp',
                'image/tiff',
                'text/plain',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ]}
              onChange={(uploadedFiles) => {
                setFiles(uploadedFiles);
                if (uploadedFiles.length === 0) setFileUploadError(true);
                else setFileUploadError(false);
              }}
            />
          </Grid>

          {fileUploadError && (
            <Grid item xs={12}>
              <Alert severity='error'>*Required at least 1 file</Alert>
            </Grid>
          )}
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
          </Grid>
        </Grid>
        <Grid item xs={0} sm={1} md={2}></Grid>
        
      </Grid>
    </Container>
  );
}
