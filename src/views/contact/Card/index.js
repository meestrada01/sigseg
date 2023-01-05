import { useEffect, useState, Fragment } from 'react';
import toast from 'react-hot-toast';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// third-party
import { isEmpty } from 'lodash';

// project imports
import UserDetails from '../UserDetails';
import UserEdit from '../UserEdit';
import ContactCard from 'ui-component/cards/ContactCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import { useDispatch, useSelector } from 'store';
import { getContacts, AddContact } from 'store/slices/contact';

// assets
import { IconSearch } from '@tabler/icons';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// ==============================|| CONTACT CARD ||============================== //

const ContactCardPage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [dataContac, setdataContac] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const { contacts } = useSelector((state) => state.contact);

    useEffect(() => {
        const filteredData = contacts.filter(
            (item) =>
                item.apellidos.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                item.nombres.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                item.documento.toString().includes(searchInput)
        );
        setdataContac(filteredData);
    }, [contacts, searchInput]);
    // get all users details
    useEffect(() => {
        setdataContac(contacts);
    }, [contacts]);

    const convertData = (userData) =>
        userData.reduce((a, curr) => {
            const firstLatter = curr.apellidos[0].toUpperCase();
            if (Object.prototype.hasOwnProperty.call(a, firstLatter)) {
                a[firstLatter].push(curr);
            } else {
                a[firstLatter] = [curr];
            }
            return a;
        }, {});

    useEffect(() => {
        setData(convertData(dataContac));
        if (!isEmpty(user)) {
            const idx = dataContac.findIndex((item) => item.id === user.id);
            if (idx > -1) setUser(dataContac[idx]);
        }
    }, [dataContac, user]);

    useEffect(() => {
        dispatch(getContacts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Guardar o Modificar
    const GuardarContacto = async (u) => {
        const { apellidos, nombres, documento, nacimiento } = u;
        let Val1 = true;
        let Val2 = true;
        let Val3 = true;
        let Val4 = true;
        if (documento.length < 8) {
            toast.error('Documento Inconsistente');
            Val1 = false;
        }
        if (apellidos.length < 5) {
            toast.error('Apellidos Observado');
            Val2 = false;
        }
        if (nombres.length < 5) {
            toast.error('Nombres  Observado');
            Val3 = false;
        }
        const isValidDate = Date.parse(nacimiento);
        if (!isValidDate) {
            toast.error('Fecha de Nacimiento Observado');
            Val4 = false;
        }
        if (Val1 || Val2 || Val3 || Val4) {
            await dispatch(AddContact(u));
        }
    };
    // handle new user insert action
    const [userDetails, setUserDetails] = useState(false);
    const [userEdit, setUserEdit] = useState(false);
    const handleOnAdd = () => {
        setUser({
            id: 0,
            tipodoc: 'DNI',
            documento: '',
            apellidos: '',
            nombres: '',
            sexo: 'M',
            nacimiento: '',
            telefono: '',
            celular: '',
            direccion: '',
            correo: '',
            cupon: '',
            observacion: '',
            distrito: ''
        });
        setUserDetails(false);
        setUserEdit(true);
    };

    return (
        <MainCard title="Registro de Contactos">
            <Grid container spacing={gridSpacing}>
                <Grid
                    className="block"
                    item
                    xs
                    zeroMinWidth
                    sx={{ display: userDetails || userEdit ? { xs: 'none', md: 'block' } : 'block' }}
                >
                    <Grid container alignItems="center" spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <OutlinedInput
                                id="input-search-card-style1"
                                placeholder="Buscar Cliente"
                                fullWidth
                                onChange={(e) => setSearchInput(e.target.value || '')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconSearch stroke={1.5} size="30px" />
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleOnAdd}>
                                Agregar
                            </Button>
                        </Grid>

                        {Object.keys(data).map((key, index) => (
                            <Fragment key={index}>
                                <Grid item xs={12}>
                                    <Divider sx={{ borderColor: theme.palette.primary.light, mt: 0.625, mb: 1.875 }} />
                                    <Typography variant="h4" color="primary" sx={{ fontSize: '1rem' }}>
                                        {key.toUpperCase()}
                                    </Typography>
                                    <Divider sx={{ borderColor: theme.palette.primary.light, mt: 1.875, mb: 0.625 }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container direction="row" spacing={gridSpacing}>
                                        {data[key].map((userRow, i) => (
                                            <Grid item xs={12} md={6} lg={4} xl={3} key={i}>
                                                <ContactCard
                                                    avatar={userRow.avatar}
                                                    name={`${userRow.apellidos} ${userRow.nombres}`}
                                                    role={userRow.role}
                                                    email={userRow.correo}
                                                    contact={userRow.celular}
                                                    location={userRow.distrito}
                                                    direccion={userRow.direccion}
                                                    onActive={() => {
                                                        setUser(userRow);
                                                        setUserDetails(true);
                                                        setUserEdit(false);
                                                    }}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Fragment>
                        ))}
                    </Grid>
                </Grid>

                {userDetails && (
                    <Grid item sx={{ width: '25%', margin: { xs: '0 auto', md: 'initial' } }}>
                        <UserDetails
                            user={user}
                            onEditClick={() => {
                                setUserDetails(false);
                                setUserEdit(true);
                            }}
                            onClose={() => {
                                setUserDetails(false);
                                setUserEdit(false);
                            }}
                        />
                    </Grid>
                )}

                {userEdit && (
                    <Grid item sx={{ width: '25%', margin: { xs: '0 auto', md: 'initial' } }}>
                        <UserEdit
                            user={user}
                            onSave={(u) => {
                                if (u.id) setUserDetails(true);
                                setUserEdit(false);
                                GuardarContacto(u);
                            }}
                            onCancel={(u) => {
                                if (u.id) setUserDetails(true);
                                setUserEdit(false);
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </MainCard>
    );
};

export default ContactCardPage;
