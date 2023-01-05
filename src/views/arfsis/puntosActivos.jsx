import PropTypes from 'prop-types';

import * as React from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'store';
import { Chip } from '@mui/material';
import { GetPuntosDigitacionAfsisActivos } from 'store/slices/arfsis';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import StorageIcon from '@mui/icons-material/Storage';

export function PuntosDigitacionActivos({ estado, periodo, meses, odbsis, exeMigracionData }) {
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);

    const { puntosDigitacion, postpuntos } = useSelector((state) => state.arfsis);

    React.useEffect(() => {
        dispatch(GetPuntosDigitacionAfsisActivos(periodo, meses, odbsis));
    }, [dispatch, meses, odbsis, periodo, postpuntos, estado]);

    React.useEffect(() => {
        setRows(puntosDigitacion);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [puntosDigitacion]);

    const tabHeader = [
        // { title: 'CODIGO', field: 'codigo', type: 'numeric', defaultSort: 'desc' },
        { title: 'CODIGO', field: 'codigo', type: 'numeric', cellStyle: { width: '2%', fontSize: '15px' } },
        { title: 'ODBSIS', field: 'idodsis', cellStyle: { width: '2%', fontSize: '15px' } },
        { title: 'PING', field: 'idppd', cellStyle: { width: '2%', fontSize: '15px' } },
        { title: 'PUNTO DE DIGITACION', field: 'punto', cellStyle: { width: '17%', fontSize: '15px' } },
        { title: 'ESTADO', field: 'estadof', cellStyle: { width: '3%', fontSize: '15px' } },
        { title: 'BASE', field: 'base', defaultSort: 'desc', cellStyle: { width: '3%', fontSize: '15px' } },
        { title: 'FECHA', field: 'fecha', cellStyle: { width: '3%', fontSize: '15px' } },
        { title: 'USUARIO', field: 'usuario', cellStyle: { width: '4%', fontSize: '15px' } },
        { title: 'FUAS', field: 'atenciones', type: 'numeric', cellStyle: { width: '2%', fontSize: '15px' } },
        { title: 'CARGA', field: 'idcarga', type: 'numeric', cellStyle: { width: '2%', fontSize: '15px' } }
    ];

    function GenDataTable(codigo, idodsis, idppd, punto, idestado, fecha, usuario, atenciones, idcarga, idbase) {
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

        return { codigo, idodsis, idppd, punto, estadof, fecha, usuario, atenciones, idcarga, base };
    }

    const dataTable = [].map.call(rows, (obj) => {
        const { codigo, idodsis, idppd, punto, idestado, fecha, usuario, atenciones, idcarga, idbase } = obj;
        return GenDataTable(codigo, idodsis, idppd, punto, idestado, fecha, usuario, atenciones, idcarga, idbase);
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
                    pageSizeOptions: [20, 50, 100],
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
        </div>
    );
}

PuntosDigitacionActivos.propTypes = {
    periodo: PropTypes.number,
    meses: PropTypes.number,
    odbsis: PropTypes.string,
    estado: PropTypes.string,
    exeMigracionData: PropTypes.func
};

export default PuntosDigitacionActivos;
