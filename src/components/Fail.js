import { Grid, Typography } from '@mui/material';

export default function Fail({ errorMessage, componentRef }) {
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
        <Typography variant='h5' style={{ color: 'red' }}>
          There was an unexpected Error while submitting your application!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <b>
            Please try again. If the problem persists contact Alachua County
            Helpdesk.
          </b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1'>Error: {errorMessage}</Typography>
      </Grid>
    </Grid>
  );
}
