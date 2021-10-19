import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TextField } from "@mui/material"
import { CartContext } from '../../../store/context/cart';
import { IProduct } from '../../../store/models/cart';
import { Button } from '@mui/material';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Header() {
    const { cart, increamentCartProduct } = React.useContext(CartContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(cart)
    return (
        <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="primary">
                        Amazin
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleOpen}
                    >
                        <Badge badgeContent={cart.products ? cart.products.length : 0} color="primary">
                            <AddShoppingCartIcon color="primary" />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {cart.products && cart.products.map((product: IProduct) => {
                            return (
                                <>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={product.name} src={product.image_url} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box sx={{}}>
                                                    <Typography color="primary" variant="h5" sx={{ display: 'inline' }}>
                                                        {product.name}
                                                    </Typography>
                                                    <IconButton><RemoveIcon /></IconButton>
                                                    <TextField sx={{ width: 50 }} value={product.quantity} />
                                                    <IconButton onClick={() => { increamentCartProduct(product) }}><AddIcon /></IconButton>
                                                </Box>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {product.description.substring(0, 200) + "..."}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </>
                            )
                        })}
                    </List>
                    <Button onClick={handleClose} sx={{ float: 'right' }}>close</Button>
                </Box>
            </Modal>
        </Box>
    )
}
