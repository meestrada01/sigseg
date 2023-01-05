import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Card, Grid, Typography } from '@mui/material';

// project imports
import Avatar from '../extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import PhoneTwoToneIcon from '@mui/icons-material/PhoneTwoTone';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| USER CONTACT CARD ||============================== //

const ContactCard = ({ avatar, contact, email, name, location, onActive, role, direccion }) => {
    const theme = useTheme();

    const avatarProfile = avatar && avatarImage(`./${avatar}`).default;

    return (
        <Card
            sx={{
                p: 2,
                bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                borderColor: theme.palette.grey[100]
            }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={8}>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="caption">{role}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth onClick={() => onActive && onActive()} style={{ cursor: 'pointer' }}>
                            <Avatar alt={name} size="lg" src={avatarProfile} sx={{ width: 40, height: 40 }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Email</Typography>
                    <Typography variant="h6">{email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Phone</Typography>
                            <Typography variant="h6">{contact}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Location</Typography>
                            <Typography variant="h6">{location}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Direccion</Typography>
                    <Typography variant="h6">{direccion}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button variant="outlined" sx={{ width: '100%' }} startIcon={<ChatBubbleTwoToneIcon />}>
                                Bandeja
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="secondary" sx={{ width: '100%' }} startIcon={<PhoneTwoToneIcon />}>
                                Notificar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

ContactCard.propTypes = {
    avatar: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    onActive: PropTypes.func,
    role: PropTypes.string,
    direccion: PropTypes.string
};

export default ContactCard;
