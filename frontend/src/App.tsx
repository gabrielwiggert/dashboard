import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material'
import { Link as MuiLink } from '@mui/material'
import CustomerDashboard from './pages/CustomerDashboard'
import TopProducts from './pages/TopProducts'
import SalesAnalytics from './pages/SalesAnalytics'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6B46C1',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 3, textAlign: 'left' }}>
                Dashboard
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <MuiLink component={Link} to="/" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: 'rgba(255, 255, 255, 0.7)' } }}>
                  Customer Dashboard
                </MuiLink>
                <MuiLink component={Link} to="/top-products" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: 'rgba(255, 255, 255, 0.7)' } }}>
                  Top Products
                </MuiLink>
                <MuiLink component={Link} to="/sales-analytics" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: 'rgba(255, 255, 255, 0.7)' } }}>
                  Sales Analytics
                </MuiLink>
              </Box>
            </Toolbar>
          </AppBar>
          <Toolbar /> {/* This empty Toolbar acts as a spacer */}
          <Container sx={{ flex: 1, py: 3 }}>
            <Routes>
              <Route path="/" element={<CustomerDashboard />} />
              <Route path="/top-products" element={<TopProducts />} />
              <Route path="/sales-analytics" element={<SalesAnalytics />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
