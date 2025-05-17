import { Typography, Paper, Box, TextField, Button, CircularProgress, Grid, Card, CardContent } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useState } from 'react'

interface CustomerMetrics {
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate: string;
}

const CustomerDashboard = () => {
  const [customerId, setCustomerId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [metrics, setMetrics] = useState<CustomerMetrics | null>(null)

  const handleCustomerIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerId(event.target.value)
    setMetrics(null)
  }

  const handleSearch = async () => {
    if (!customerId.trim()) return

    setIsLoading(true)
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500))
      // Simulate fetched data
      setMetrics({
        totalSpent: 1250.99,
        averageOrderValue: 125.50,
        lastOrderDate: '2024-03-15'
      })
      console.log('Searching for customer:', customerId)
    } catch (error) {
      console.error('Error searching for customer:', error)
      setMetrics(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Customer Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Overview of customer metrics, behavior, and insights.
        </Typography>
        
        <Box sx={{ 
          mt: 3,
          display: 'flex',
          gap: 2,
          maxWidth: 450
        }}>
          <TextField
            fullWidth
            label="Customer ID"
            variant="outlined"
            value={customerId}
            onChange={handleCustomerIdChange}
            placeholder="Enter customer ID"
            size="medium"
            disabled={isLoading}
          />
          <Button
            variant="contained"
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
            onClick={handleSearch}
            sx={{ minWidth: 120 }}
            disabled={isLoading || !customerId.trim()}
          >
            {isLoading ? 'Searching' : 'Search'}
          </Button>
        </Box>

        {metrics && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <AttachMoneyIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Total Spent
                    </Typography>
                    <Typography variant="h4" color="primary">
                      ${metrics.totalSpent.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <ShoppingBasketIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Average Order Value
                    </Typography>
                    <Typography variant="h4" color="primary">
                      ${metrics.averageOrderValue.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <CalendarTodayIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Last Order Date
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {new Date(metrics.lastOrderDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default CustomerDashboard 