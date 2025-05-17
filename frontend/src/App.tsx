import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material'
import { Link as MuiLink } from '@mui/material'
import Home from './pages/Home'
import About from './pages/About'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#646cff',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Dashboard
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <MuiLink component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
                  Home
                </MuiLink>
                <MuiLink component={Link} to="/about" color="inherit" sx={{ textDecoration: 'none' }}>
                  About
                </MuiLink>
              </Box>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
