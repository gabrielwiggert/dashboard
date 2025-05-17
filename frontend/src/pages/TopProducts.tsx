import { Typography, Paper, Box } from '@mui/material'

const TopProducts = () => (
  <Paper sx={{ p: 3 }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        Top Products
      </Typography>
      <Typography variant="body1">
        Analysis of best-performing products and their performance metrics.
      </Typography>
    </Box>
  </Paper>
)

export default TopProducts 