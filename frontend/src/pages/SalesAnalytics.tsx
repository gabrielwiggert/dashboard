import { Typography, Paper, Box, Grid, Card, CardContent } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useState } from 'react'

interface SalesData {
  category: string;
  revenue: number;
  orders: number;
}

const mockSalesData: SalesData[] = [
  { category: 'Electronics', revenue: 45000, orders: 150 },
  { category: 'Accessories', revenue: 25000, orders: 300 },
  { category: 'Gaming', revenue: 35000, orders: 120 },
  { category: 'Office', revenue: 20000, orders: 200 },
  { category: 'Audio', revenue: 30000, orders: 180 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const SalesAnalytics = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(30, 'days'))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs())

  const totalRevenue = mockSalesData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = mockSalesData.reduce((sum, item) => sum + item.orders, 0)

  return (
    <Paper sx={{ p: 3 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Sales Analytics
        </Typography>
        <Typography variant="body1" gutterBottom>
          Comprehensive analysis of sales trends, patterns, and performance indicators.
        </Typography>

        <Box sx={{ mt: 3, mb: 4, display: 'flex', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: { size: 'small' },
              }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{
                textField: { size: 'small' },
              }}
            />
          </LocalizationProvider>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <AttachMoneyIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Total Revenue
                </Typography>
                <Typography variant="h4" color="primary">
                  ${totalRevenue.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <ShoppingBasketIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Orders Completed
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalOrders.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Revenue by Category
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockSalesData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Revenue Distribution
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockSalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="revenue"
                    nameKey="category"
                  >
                    {mockSalesData.map((entry, index) => (
                      <Cell key={`cell-${entry.category}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default SalesAnalytics 