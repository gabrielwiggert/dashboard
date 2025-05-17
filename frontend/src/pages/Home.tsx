import { Typography, Paper, Box } from '@mui/material'

const Home = () => (
  <Paper sx={{ p: 3 }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1">
        Welcome to our application!
      </Typography>
    </Box>
  </Paper>
)

export default Home 