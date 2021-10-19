import * as React from 'react';
import Card from '@mui/material/Card';
import Head from 'next/head'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CartContext } from '../store/context/cart';
import products from '../data/data.json'
export default function Product() {
    const { addToCart } = React.useContext(CartContext);
    const router = useRouter()
    const product = products.products.filter(product => product.name === router.query.id)[0]
    console.log(product)
    const [currency, setCurrency] = React.useState<string>('EUR');

    const handleChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as string);
    };
    return (
        <>
            <Head>
                <title>Amazin | {product.name}</title>
            </Head>
            <Card>
                <CardMedia
                    component="img"
                    height="450"
                    image={product.image_url}
                    alt={product.name}
                    sx={{ maxWidth: 300, }}
                />
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Rating name="read-only" value={product.rating} readOnly />
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'inline', marginX: 10 }}>
                            {product.prices.filter(price => price.currency === currency)[0].currency} {product.prices.filter(price => price.currency === currency)[0].price}
                        </Typography>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currency}
                                label="Currency"
                                onChange={handleChange}
                            >
                                <MenuItem value={"EUR"}>EUR</MenuItem>
                                <MenuItem value={"KES"}>KES</MenuItem>
                                <MenuItem value={"NGN"}>NGN</MenuItem>
                                <MenuItem value={"USD"}>USD</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                            addToCart(product)
                        }}
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    )
}
