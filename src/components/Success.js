import { Grid, Typography } from '@mui/material';

export default function Success({ applicationID, componentRef }) {
  return (
    <Grid
      container
      spacing={3}
      style={{
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '50px',
      }}
      ref={componentRef}
    >
      <Grid item xs={12}>
        <Typography variant='h5' style={{ color: '#42ba96' }}>
          Your application has been submitted!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <b>Your application ID is {applicationID}</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1'>
          Please keep a copy for your records.
        </Typography>
      </Grid>
    </Grid>
  );
}
