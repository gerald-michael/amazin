import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Paper } from '@mui/material';
const Copyright = () => {
    return (
        <Paper>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="#">
                    amazin.com
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Paper>
    );
}

export default Copyright
