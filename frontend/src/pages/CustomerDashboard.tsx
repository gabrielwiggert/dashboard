import { Typography, Paper, Box } from '@mui/material'

const CustomerDashboard = () => (
  <Paper sx={{ p: 3 }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        Customer Dashboard
      </Typography>
      <Typography variant="body1">
        Overview of customer metrics, behavior, and insights.
      </Typography>
    </Box>
  </Paper>
)

export default CustomerDashboard 