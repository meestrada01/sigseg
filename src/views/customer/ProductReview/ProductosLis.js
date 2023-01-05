import PropTypes from 'prop-types';

import * as React from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'store';
import { format, parseISO } from 'date-fns';

import { Chip } from '@mui/material';
import { getProducto } from 'store/slices/inventario';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

export function ProductosLis({ ItemsProductos }) {
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);

    const { productos, producto } = useSelector((state) => state.inventario);
    React.useEffect(() => {
        dispatch(getProducto());
    }, [dispatch, producto]);

    React.useEffect(() => {
        setRows(productos);
    }, [productos]);

    const tabHeader = [
        { title: 'id', field: 'id', type: 'numeric', defaultSort: 'desc' },
        { title: 'Codigo', field: 'codigo' },
        { title: 'Detalle', field: 'detalle', cellStyle: { width: '16%', fontSize: '15px' } },
        { title: 'Concentracion', field: 'concentracion' },
        { title: 'Stock Min', field: 'stockmin', type: 'numeric' },
        { title: 'Stock Max', field: 'stockmax', type: 'numeric' },
        { title: 'Receta', field: 'recetaf' },
        { title: 'Expira', field: 'expiraf' },
        { title: 'Fecha de Registro', field: 'fechareg', cellStyle: { width: '10%', fontSize: '12px' } },
        { title: 'Usuario', field: 'idusuario' },
        { title: 'Estado', field: 'estadof' },
        { title: 'Editar', field: 'editar' }
    ];

    function GenRowTable(row) {
        const { id, codigo, detalle, concentracion, stockmin, stockmax, receta, expira, registro, idusuario, idestado } = row;
        const editar = (
            <Chip
                onClick={() => ItemsProductos(row)}
                icon={<ModeEditOutlineIcon style={{ color: 'white' }} />}
                label="Editar"
                clickable
                style={{ backgroundColor: '#885dfc', color: 'white' }}
            />
        );

        const estadof = (
            <Chip
                icon={idestado === 1 ? <CancelIcon style={{ color: 'white' }} /> : <DoneOutlineIcon style={{ color: 'white' }} />}
                label={idestado === 1 ? 'Inactivo' : 'Activo'}
                color={idestado === 1 ? 'error' : 'success'}
            />
        );

        const recetaf = receta ? <Chip icon={<ReceiptIcon />} color="warning" /> : '';
        const expiraf = expira ? <Chip icon={<EventRepeatIcon />} color="warning" /> : '';
        const fechareg = format(parseISO(registro), 'dd-MM-yyyy hh:mm.ss');

        return { id, codigo, detalle, concentracion, stockmin, stockmax, recetaf, expiraf, fechareg, idusuario, estadof, editar };
    }

    const dataTable = [].map.call(rows, (obj) => GenRowTable(obj));

    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={tabHeader}
                data={dataTable}
                title="Productos Registrados"
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

ProductosLis.propTypes = {
    ItemsProductos: PropTypes.func
};

export default ProductosLis;
