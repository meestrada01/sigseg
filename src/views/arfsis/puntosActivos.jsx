import PropTypes from 'prop-types';

import * as React from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'store';
import { Chip, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GetPuntosDigitacionAfsisActivos } from 'store/slices/arfsis';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import StorageIcon from '@mui/icons-material/Storage';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

export function PuntosDigitacionActivos({ estado, periodo, meses, odbsis, exeMigracionData, exeVerificarMigracion }) {
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);

    const { puntosDigitacion, postpuntos } = useSelector((state) => state.arfsis);
    const [openVerficar, setOpenVerficar] = React.useState(false);

    const VerficarClose = () => {
        setOpenVerficar(false);
    };

    React.useEffect(() => {
        dispatch(GetPuntosDigitacionAfsisActivos(periodo, meses, odbsis));
        VerficarClose();
    }, [dispatch, meses, odbsis, periodo, postpuntos, estado]);

    React.useEffect(() => {
        setRows(puntosDigitacion);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [puntosDigitacion]);

    const [vcodigo, setvcodigo] = React.useState(0);
    const [vPunto, setvPunto] = React.useState('');
    const [vAtenciones, setvvAtenciones] = React.useState(0);
    const [vObservacion, setvObservacion] = React.useState('');
    const [verificacion, setverificacion] = React.useState(0);

    const VerficarClickOpen = (codigo, punto, fuas, observacion, verificaion) => {
        setOpenVerficar(true);
        setvcodigo(codigo);
        setvPunto(punto);
        setvvAtenciones(fuas);
        setvObservacion(observacion);
        setverificacion(verificaion);
    };

    const tabHeader = [
        // { title: 'CODIGO', field: 'codigo', type: 'numeric', defaultSort: 'desc' },
        { title: 'Codigo', field: 'codigo', type: 'numeric', cellStyle: { width: '1%', fontSize: '15px' } },
        { title: 'Ping', field: 'idppd', cellStyle: { width: '2%', fontSize: '15px' } },
        { title: 'Punto de Digitacion', field: 'punto', cellStyle: { width: '14%', fontSize: '15px' } },
        { title: 'Estado', field: 'estadof', cellStyle: { width: '3%', fontSize: '15px' } },
        { title: 'Base', field: 'base', defaultSort: 'desc', cellStyle: { width: '3%', fontSize: '15px' } },
        { title: 'Fase', field: 'verificacion', cellStyle: { width: '2%', fontSize: '15px' } },
        { title: 'Fecha', field: 'fecha', cellStyle: { width: '3%', fontSize: '15px' } },
        { title: 'Usuario', field: 'usuario', cellStyle: { width: '3%', fontSize: '15px' } },
        { title: 'Fuas', field: 'atenciones', type: 'numeric', cellStyle: { width: '2%', fontSize: '15px' } },
        { title: 'Carga', field: 'idcarga', type: 'numeric', cellStyle: { width: '2%', fontSize: '15px' } }
    ];

    function GenDataTable(
        codigo,
        idodsis,
        idppd,
        punto,
        idestado,
        fecha,
        usuario,
        atenciones,
        idcarga,
        idbase,
        idmigracion,
        idrecepcion,
        observacion
    ) {
        const estadof = (
            <Chip
                icon={idestado === 1 ? <CancelIcon style={{ color: 'white' }} /> : <DoneOutlineIcon style={{ color: 'white' }} />}
                label={idestado === 1 ? 'Inactivo' : 'Activo'}
                color={idestado === 1 ? 'error' : 'success'}
            />
        );

        const base =
            idbase !== '' ? (
                <Chip
                    color={usuario === '' ? 'warning' : 'secondary'}
                    label={idbase}
                    disabled={usuario !== ''}
                    onClick={() => exeMigracionData(periodo, meses, idbase, codigo)}
                    icon={<StorageIcon style={{ color: 'white' }} />}
                />
            ) : (
                ''
            );

        const verificacion =
            idcarga !== 0 ? (
                <Chip
                    color={idrecepcion !== 0 ? 'success' : 'info'}
                    label={idrecepcion !== 0 ? 'Verificado' : 'Pendiente'}
                    onClick={() => VerficarClickOpen(idmigracion, punto, atenciones, observacion, idrecepcion)}
                    icon={<PlaylistAddCheckCircleIcon style={{ color: 'white' }} />}
                />
            ) : (
                ''
            );

        return { codigo, idodsis, idppd, punto, estadof, fecha, usuario, atenciones, idcarga, base, verificacion };
    }

    const dataTable = [].map.call(rows, (obj) => {
        const {
            codigo,
            idodsis,
            idppd,
            punto,
            idestado,
            fecha,
            usuario,
            atenciones,
            idcarga,
            idbase,
            idmigracion,
            idrecepcion,
            observacion
        } = obj;
        return GenDataTable(
            codigo,
            idodsis,
            idppd,
            punto,
            idestado,
            fecha,
            usuario,
            atenciones,
            idcarga,
            idbase,
            idmigracion,
            idrecepcion,
            observacion
        );
    });

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={tabHeader}
                data={dataTable}
                title={`Registro de Ultima Carga: ${estado}`}
                options={{
                    paging: true,
                    pageSize: 8,
                    emptyRowsWhenPaging: true,
                    pageSizeOptions: [8, 20, 50, 100],
                    sorting: true
                }}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} of {count}',
                        labelRowsSelect: 'Filas'
                    },
                    toolbar: {
                        nRowsSelected: '{0} row(s) selected',
                        searchTooltip: 'Buscar Registro Aqui',
                        searchPlaceholder: 'Buscar'
                    },
                    header: {
                        actions: 'Actions'
                    },
                    body: {
                        emptyDataSourceMessage: 'No se encontraron registros',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
                }}
            />
            <Dialog open={openVerficar} onClose={VerficarClose}>
                <DialogTitle>{vPunto}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Codigo de Migracion: {vcodigo} </DialogContentText>
                    <DialogContentText>
                        Periodo Envio : {periodo}-{meses}
                    </DialogContentText>
                    <DialogContentText>Numero de Atenciones : {vAtenciones} </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="vObservacion"
                        name="vObservacion"
                        onChange={(e) => setvObservacion(e.target.value)}
                        value={vObservacion}
                        label="Observacion"
                        type="text"
                        disabled={verificacion !== 0}
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={VerficarClose}>Cancel</Button>
                    <Button color="error" disabled={verificacion !== 0} onClick={() => exeVerificarMigracion(vcodigo, vObservacion)}>
                        ENVIAR VERIFICACION
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

PuntosDigitacionActivos.propTypes = {
    periodo: PropTypes.number,
    meses: PropTypes.number,
    odbsis: PropTypes.string,
    estado: PropTypes.string,
    exeMigracionData: PropTypes.func,
    exeVerificarMigracion: PropTypes.func
};

export default PuntosDigitacionActivos;
