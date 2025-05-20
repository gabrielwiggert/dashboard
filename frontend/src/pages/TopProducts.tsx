import { Typography, Paper, Box, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_TOP_PRODUCTS = gql`
  query GetTopProducts($limit: Int!) {
    getTopSellingProducts(limit: $limit) {
      id
      name
      price
      quantitySold
      rank
    }
  }
`;

interface Product {
  id: string;
  name: string;
  quantitySold: number;
  price: number;
  rank: number;
}

const TopProducts = () => {
  const [limit, setLimit] = useState<number>(5)
  const { loading, error, data } = useQuery<{ getTopSellingProducts: Product[] }>(GET_TOP_PRODUCTS, {
    variables: { limit },
  });

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(event.target.value as number)
  }

  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography color="error">Error: {error.message}</Typography>
      </Paper>
    );
  }

  const topProducts = data?.getTopSellingProducts || [];

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
                <TableCell>Rank</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Quantity Sold</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>#{product.rank}</TableCell>
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