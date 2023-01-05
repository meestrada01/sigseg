import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    Select,
    MenuItem,
    TextField
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import esLocate from 'date-fns/locale/es';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// assets
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

// sticky edit card

function ElevationScroll({ children }) {
    return React.cloneElement(children, {
        style: {
            width: '100%'
        }
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.node,
    window: PropTypes.object
};

// ==============================|| CONTACT CARD/LIST USER EDIT ||============================== //

const UserEdit = ({ user, onCancel, onSave, ...others }) => {
    const theme = useTheme();
    const [FechaNac, setFechaNac] = React.useState(dayjs(user.nacimiento));
    // save user to local state to update details and submit letter
    const [profile, setProfile] = useState(user);
    useEffect(() => {
        setProfile(user);
    }, [user]);

    useEffect(() => {
        setProfile({ ...profile, nacimiento: FechaNac });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [FechaNac]);

    return (
        <ElevationScroll {...others}>
            <SubCard
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    width: '100%',
                    maxWidth: '100%'
                }}
                content={false}
            >
                <PerfectScrollbar style={{ height: 'calc(100vh - 100px)', overflowX: 'hidden' }}>
                    <Grid container spacing={gridSpacing} sx={{ p: 1 }}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item xs zeroMinWidth>
                                    <Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color="secondary">
                                                {profile.id === 0 ? `Crear Nuevo Registro` : `Editar Registro`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => onCancel(profile)} size="large">
                                        <HighlightOffTwoToneIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <OutlinedInput
                            style={{ display: 'none' }}
                            value={profile.id || 0}
                            onChange={(e) => setProfile({ ...profile, id: e.target.value })}
                            type="hidden"
                        />
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo Documento</InputLabel>
                                <Select
                                    disabled={profile.id > 0}
                                    value={profile.tipodoc || 'DNI'}
                                    label="Tipo Documento"
                                    onChange={(e) => setProfile({ ...profile, tipodoc: e.target.value })}
                                >
                                    <MenuItem value="DNI">DNI-Documento de Identidad</MenuItem>
                                    <MenuItem value="RUC">RUC-Registro Único de Contribuyente</MenuItem>
                                    <MenuItem value="CEX">CEX-Carnet de Extranjería</MenuItem>
                                    <MenuItem value="PAS">PAS-Pasaporte</MenuItem>
                                    <MenuItem value="IND">IND-Sin Documento</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={10}>
                            <FormControl fullWidth>
                                <InputLabel>Documento</InputLabel>
                                <OutlinedInput
                                    disabled={profile.id > 0}
                                    value={profile.documento || ''}
                                    onChange={(e) => setProfile({ ...profile, documento: e.target.value })}
                                    type="text"
                                    label="Documento"
                                    autoFocus
                                    inputProps={{ maxLength: 10 }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <CreditScoreIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={2}>
                            <Grid container justifyContent="right">
                                <IconButton
                                    disabled={!profile.documento}
                                    aria-label="fingerprint"
                                    size="large"
                                    color="secondary"
                                    onClick={() => onCancel(profile)}
                                >
                                    <PersonSearchIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Apellidos</InputLabel>
                                <OutlinedInput
                                    value={profile.apellidos || ''}
                                    onChange={(e) => setProfile({ ...profile, apellidos: e.target.value.toUpperCase() })}
                                    type="text"
                                    label="Apellidos"
                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountBoxIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Nombres</InputLabel>
                                <OutlinedInput
                                    value={profile.nombres || ''}
                                    onChange={(e) => setProfile({ ...profile, nombres: e.target.value.toUpperCase() })}
                                    type="text"
                                    label="Nombres"
                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountBoxIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Genero</InputLabel>
                                <Select
                                    value={profile.sexo || 'M'}
                                    label="Genero"
                                    onChange={(e) => setProfile({ ...profile, sexo: e.target.value })}
                                >
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Femenino</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esLocate}>
                                    <DatePicker
                                        disableFuture
                                        label="Fecha de Nacimiento"
                                        openTo="year"
                                        inputFormat="DD/MM/YYYY"
                                        views={['year', 'month', 'day']}
                                        value={FechaNac}
                                        onChange={(newValue) => {
                                            setFechaNac(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Correo</InputLabel>
                                <OutlinedInput
                                    value={profile.correo}
                                    onChange={(e) => setProfile({ ...profile, correo: e.target.value.toUpperCase() })}
                                    type="email"
                                    label="Correo"
                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <MailTwoToneIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Telefono</InputLabel>
                                <OutlinedInput
                                    value={profile.telefono || ''}
                                    onChange={(e) => {
                                        setProfile({ ...profile, telefono: e.target.value });
                                    }}
                                    type="text"
                                    label="Telefono"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <CallTwoToneIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Celular</InputLabel>
                                <OutlinedInput
                                    value={profile.celular || ''}
                                    onChange={(e) => {
                                        setProfile({ ...profile, celular: e.target.value });
                                    }}
                                    type="text"
                                    label="Celular"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <CallTwoToneIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Distrito</InputLabel>
                                <OutlinedInput
                                    value={profile.distrito || ''}
                                    onChange={(e) => setProfile({ ...profile, distrito: e.target.value.toUpperCase() })}
                                    type="text"
                                    label="Distrito"
                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PinDropIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Direccion</InputLabel>
                                <OutlinedInput
                                    value={profile.direccion || ''}
                                    onChange={(e) => setProfile({ ...profile, direccion: e.target.value.toUpperCase() })}
                                    type="text"
                                    label="Direccion"
                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <HomeIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Cupon</InputLabel>
                                <OutlinedInput
                                    value={profile.cupon || ''}
                                    onChange={(e) => setProfile({ ...profile, cupon: e.target.value })}
                                    type="text"
                                    label="Cupon"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PriceChangeIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Observacion</InputLabel>
                                <OutlinedInput
                                    defaultValue={profile.observacion}
                                    onChange={(e) => setProfile({ ...profile, observacion: e.target.value.toUpperCase() })}
                                    type="text"
                                    label="Observacion"
                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                    multiline
                                    rows={2}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Button variant="contained" fullWidth onClick={() => onSave(profile)}>
                                        Guardar
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="outlined" fullWidth onClick={() => onCancel(profile)}>
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </SubCard>
        </ElevationScroll>
    );
};

UserEdit.propTypes = {
    user: PropTypes.object,
    onCancel: PropTypes.func,
    onSave: PropTypes.func
};

export default UserEdit;
