import PropTypes from 'prop-types';

import * as React from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'store';
import { format, parseISO } from 'date-fns';

import { Chip } from '@mui/material';
import { getPresentacion } from 'store/slices/inventario';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

export function PresentacionLis({ ItemsTipoProducto }) {
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);

    const { presentacion, postpresentacion } = useSelector((state) => state.inventario);
    React.useEffect(() => {
        dispatch(getPresentacion());
    }, [dispatch, postpresentacion]);

    React.useEffect(() => {
        setRows(presentacion);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [presentacion]);

    const tabHeader = [
        { title: 'Codigo', field: 'id', type: 'numeric', defaultSort: 'desc' },
        { title: 'Detalle', field: 'detalle', cellStyle: { width: '25%', fontSize: '15px' } },
        { title: 'Usuario', field: 'usuario' },
        { title: 'Registro', field: 'fechareg' },
        { title: 'Estado', field: 'estadof' },
        { title: 'Editar', field: 'editar' }
    ];

    function GenDataTable(id, detalle, registro, usuario, estado) {
        const editar = (
            <Chip
                onClick={() => ItemsTipoProducto(id, detalle, estado)}
                icon={<ModeEditOutlineIcon style={{ color: 'white' }} />}
                label="Editar"
                clickable
                style={{ backgroundColor: '#885dfc', color: 'white' }}
            />
        );

        const estadof = (
            <Chip
                icon={estado === 1 ? <CancelIcon style={{ color: 'white' }} /> : <DoneOutlineIcon style={{ color: 'white' }} />}
                label={estado === 1 ? 'Inactivo' : 'Activo'}
                color={estado === 1 ? 'error' : 'success'}
            />
        );

        const fechareg = format(parseISO(registro), 'dd-MM-yyyy');

        return { id, detalle, fechareg, usuario, estadof, editar };
    }

    const dataTable = [].map.call(rows, (obj) => {
        const { id, detalle, registro, usuario, estado } = obj;
        return GenDataTable(id, detalle, registro, usuario, estado);
    });

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={tabHeader}
                data={dataTable}
                title="Presentacion de Productos"
                options={{
                    paging: true,
                    pageSize: 5,
                    emptyRowsWhenPaging: true,
                    pageSizeOptions: [5, 10, 20, 50],
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

PresentacionLis.propTypes = {
    ItemsTipoProducto: PropTypes.func
};

export default PresentacionLis;
