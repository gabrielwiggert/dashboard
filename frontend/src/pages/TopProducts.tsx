import { Typography, Paper, Box, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

interface Product {
  id: number;
  name: string;
  quantitySold: number;
  price: number;
}

const mockProducts: Product[] = [
  { id: 1, name: "Premium Headphones", quantitySold: 150, price: 199.99 },
  { id: 2, name: "Wireless Mouse", quantitySold: 320, price: 49.99 },
  { id: 3, name: "4K Monitor", quantitySold: 75, price: 499.99 },
  { id: 4, name: "Mechanical Keyboard", quantitySold: 200, price: 129.99 },
  { id: 5, name: "USB-C Hub", quantitySold: 450, price: 39.99 },
  { id: 6, name: "Gaming Chair", quantitySold: 90, price: 299.99 },
  { id: 7, name: "Webcam HD", quantitySold: 280, price: 79.99 },
  { id: 8, name: "Bluetooth Speaker", quantitySold: 175, price: 89.99 },
  { id: 9, name: "Graphics Tablet", quantitySold: 120, price: 159.99 },
  { id: 10, name: "External SSD 1TB", quantitySold: 230, price: 149.99 },
  { id: 11, name: "Wireless Earbuds", quantitySold: 500, price: 129.99 },
  { id: 12, name: "Power Bank", quantitySold: 400, price: 49.99 },
  { id: 13, name: "Laptop Stand", quantitySold: 180, price: 29.99 },
  { id: 14, name: "Gaming Mouse", quantitySold: 350, price: 69.99 },
  { id: 15, name: "Desk Lamp", quantitySold: 160, price: 34.99 },
  { id: 16, name: "Microphone", quantitySold: 140, price: 119.99 },
  { id: 17, name: "Camera Lens", quantitySold: 85, price: 249.99 },
  { id: 18, name: "Phone Stand", quantitySold: 290, price: 19.99 },
  { id: 19, name: "Tablet Case", quantitySold: 220, price: 39.99 },
  { id: 20, name: "Smart Watch", quantitySold: 170, price: 199.99 },
]

const TopProducts = () => {
  const [limit, setLimit] = useState<number>(5)

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(event.target.value as number)
  }

  // Sort products by quantity sold and take the top N based on limit
  const topProducts = [...mockProducts]
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, limit)

  return (
    <Paper sx={{ p: 3 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Top Products
        </Typography>
        <Typography variant="body1" gutterBottom>
          Analysis of best-performing products and their performance metrics.
        </Typography>

        <Box sx={{ mt: 3, mb: 3, maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="limit-select-label">Show Top</InputLabel>
            <Select
              labelId="limit-select-label"
              id="limit-select"
              value={limit}
              label="Show Top"
              onChange={handleLimitChange}
            >
              <MenuItem value={5}>Top 5</MenuItem>
              <MenuItem value={10}>Top 10</MenuItem>
              <MenuItem value={20}>Top 20</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Quantity Sold</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="right">{product.quantitySold.toLocaleString()}</TableCell>
                  <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    ${(product.quantitySold * product.price).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  )
}

export default TopProducts 