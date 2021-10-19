import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Rating from '@mui/material/Rating';
import { Tooltip } from '@mui/material';
import { IProduct } from "../../store/models/cart";
import { CartContext } from '../../store/context/cart';
import Link from 'next/link'
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface IProp {
    product: IProduct
}
export default function RecipeReviewCard(props: IProp) {
    const [expanded, setExpanded] = React.useState(false);
    const { addToCart } = React.useContext(CartContext);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const { product } = props
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Link href={`/${product.name}`}>
                <a style={{ color: 'inherit', textDecoration: "none" }}>
                    <CardHeader
                        title={product.name}
                        subheader={<Rating name="read-only" value={product.rating} readOnly />
                        }
                    />
                    <CardMedia
                        component="img"
                        height="350"
                        image={product.image_url}
                        alt={product.name}
                    />
                </a>
            </Link>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {product.prices[0].amount}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                        addToCart(product)
                    }}
                >
                    <AddShoppingCartIcon />
                </IconButton>
                <Tooltip title="Description">
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Tooltip>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Description</Typography>
                    <Typography paragraph>
                        {product.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}