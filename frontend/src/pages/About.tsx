import { Typography, Paper, Box } from '@mui/material'

const About = () => (
  <Paper sx={{ p: 3 }}>
    <Box>
      <Typography variant="h4" gutterBottom>
        About Page
      </Typography>
      <Typography variant="body1">
        This is the about page of our application.
      </Typography>
    </Box>
  </Paper>
)

export default About 