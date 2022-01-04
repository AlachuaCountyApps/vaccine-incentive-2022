import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import Form from './components/Form';

function refreshPage() {
  window.location.reload();
}

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ flexGrow: '1' }}>
            <img
              src='assets/acLogo.png'
              alt='Alachua County Logo'
              onClick={refreshPage}
              style={{ cursor: 'pointer' }}
            />
          </Box>
          <Typography
            variant='h6'
            component='h1'
            sx={{
              textAlign: 'right',
              lineHeight: '1.5rem',
              cursor: 'pointer',
            }}
            onClick={refreshPage}
          >
            Insurance Incentive Program - 2022
          </Typography>
        </Toolbar>
      </AppBar>
      <Form />
    </Box>
  );
}

export default App;
