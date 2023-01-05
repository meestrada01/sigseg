import PropTypes from 'prop-types';
import { cloneElement } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Chip, Divider, Grid, IconButton, Typography, useScrollTrigger } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import abrirFormatoConsulta from 'store/slices/formatos';

// assets
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import CakeTwoToneIcon from '@mui/icons-material/CakeTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import SummarizeIcon from '@mui/icons-material/Summarize';

// sticky details card

function ElevationScroll({ children, window }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 130,
        target: window || undefined
    });

    return cloneElement(children, {
        style: {
            position: trigger ? 'fixed' : 'relative',
            top: trigger ? 83 : 0,
            width: trigger ? 318 : '100%'
        }
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.node,
    window: PropTypes.object
};

// ==============================|| CONTACT CARD/LIST USER DETAILS ||============================== //

const UserDetails = ({ user, onClose, onEditClick, ...others }) => {
    const theme = useTheme();
    return (
        <ElevationScroll {...others}>
            <SubCard
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    width: '100%',
                    maxWidth: '100%'
                }}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h3" color="secondary">
                                            {user.id !== 0 ? `Registro de  Cliente` : `Editar Registro`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" component="div">
                                            {`${user.apellidos} ${user.nombres}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Chip
                                            label={`${user.tipodoc}: ${user.documento}`}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                bgcolor:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary.light
                                            }}
                                        />
                                        <Chip
                                            label={`Sexo: ${user.sexo}`}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                bgcolor:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary.light
                                            }}
                                        />
                                        <Chip
                                            label={`Edad: 0 `}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                bgcolor:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary.light
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={5}>
                                <Button variant="outlined" fullWidth startIcon={<ChatBubbleTwoToneIcon />} onClick={onEditClick}>
                                    Editar
                                </Button>
                            </Grid>
                            <Grid item xs={5}>
                                <Button
                                    disabled
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    startIcon={<NotInterestedTwoToneIcon />}
                                    onClick={abrirFormatoConsulta(user.id)}
                                >
                                    Block
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={onClose} color="secondary">
                                    <HighlightOffTwoToneIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <MailTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2" sx={{ mb: 0.625 }}>
                                    {user.correo}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <CallTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2">{user.telefono}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <CallTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2">{user.celular}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <BusinessTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2">{user.distrito}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <PinDropTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2">{user.direccion}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <CakeTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2">{user.nacimiento}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <InfoTwoToneIcon sx={{ verticalAlign: 'sub', fontSize: '1.125rem', mr: 0.625 }} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography variant="body2" sx={{ mb: 0.625 }}>
                                    {user.observacion}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            startIcon={<SummarizeIcon />}
                            onClick={abrirFormatoConsulta(user.id)}
                        >
                            Plantilla de Consulta
                        </Button>
                    </Grid>
                </Grid>
            </SubCard>
        </ElevationScroll>
    );
};

UserDetails.propTypes = {
    user: PropTypes.object,
    onClose: PropTypes.func,
    onEditClick: PropTypes.func
};

export default UserDetails;
