import { useState, useEffect } from 'react';
// material-ui

import { Grid, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import { getOBDSIS } from '../../store/service/catalogo';
import { getMigracionData, getVerificarMigracion } from '../../store/service/arfsis';
import { Meses, Periodos } from '../../json/index';
import { NotiSuccess } from 'utils/Notif';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import PuntosDigitacionActivos from './puntosActivos';

// ==============================|| PAGINA DE GESTION ARFSIS ||============================== //

const fecha = new Date();
const ano = fecha.getFullYear();
const mes = fecha.getMonth() + 1;

const GestionArfsis = () => {
    const [Dataodbsis, setDataodbsis] = useState([]);

    const getDataOBDSIS = async () => {
        const data = await getOBDSIS();
        setDataodbsis(data);
    };

    useEffect(() => {
        getDataOBDSIS();
    }, []);

    const [meses, setmeses] = useState(mes);
    const [periodo, setperiodo] = useState(ano);
    const [odbsis, setodbsis] = useState('022');
    const [estado, setestado] = useState('Ninguno.');

    const exeMigracionData = async (ano, mes, base, idpunto) => {
        const data = await getMigracionData(ano, mes, base, idpunto);
        if (data) {
            setestado(data.mensaje);
        }
    };

    const exeVerificarMigracion = async (codigo, observacion) => {
        const data = await getVerificarMigracion(codigo, observacion);
        if (data) {
            setestado(data);
            NotiSuccess(`Codigo ${data} Verificado Con Exito.`);
        }
    };
    return (
        <MainCard title="Gestion de Migracion de Base de Datos Arfsis">
            <Grid container spacing={1} item xs={12} md={12}>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>OFICINAS DESCENTRALIZADAS DEL SEGURO INTEGRAL DE SALUD</InputLabel>
                        <Select
                            label="OFICINAS DESCENTRALIZADAS DEL SEGURO INTEGRAL DE SALUD"
                            name="odbsis"
                            id="odbsis"
                            variant="outlined"
                            required
                            fullWidth
                            value={odbsis}
                            onChange={(e) => setodbsis(e.target.value)}
                            inputProps={{
                                autoComplete: 'off'
                            }}
                        >
                            {Dataodbsis.map((option) => (
                                <MenuItem value={option.codigo} key={option.codigo}>
                                    {option.detalle}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                        <InputLabel required>PERIODO</InputLabel>
                        <Select
                            name="periodo"
                            id="periodo"
                            variant="outlined"
                            required
                            onChange={(e) => setperiodo(e.target.value)}
                            value={periodo}
                            label="PERIODO"
                            inputProps={{
                                autoComplete: 'off'
                            }}
                        >
                            {Periodos.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                        <InputLabel required>MES</InputLabel>
                        <Select
                            label="MES"
                            name="meses"
                            id="meses"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={(e) => setmeses(e.target.value)}
                            value={meses}
                            inputProps={{
                                autoComplete: 'off'
                            }}
                        >
                            {Meses.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <PuntosDigitacionActivos
                estado={estado}
                periodo={periodo}
                meses={meses}
                odbsis={odbsis}
                exeMigracionData={exeMigracionData}
                exeVerificarMigracion={exeVerificarMigracion}
            />
        </MainCard>
    );
};

export default GestionArfsis;
