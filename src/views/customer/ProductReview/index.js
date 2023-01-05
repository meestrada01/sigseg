import * as React from 'react';
// material-ui
import { CardContent, ButtonGroup, Button } from '@mui/material';

// project imports
import ReviewEdit from './ReviewEdit';
import TipoProducto from './TipoProducto';
import Medida from './Medida';
import Presentacion from './Presentacion';
import Clasificacion from './Clasificacion';
import FromProducto from './FromProducto';

import MainCard from 'ui-component/cards/MainCard';
// import { useDispatch, useSelector } from 'store';
// import { getProductReviews } from 'store/slices/customer';

// assets
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddchartIcon from '@mui/icons-material/Addchart';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import InventoryIcon from '@mui/icons-material/Inventory';

// ==============================|| PRODUCT REVIEW LIST ||============================== //

const ProductReviewList = () => {
    // open dialog to edit review
    const [open, setOpen] = React.useState(false);
    const handleCloseDialog = () => {
        setOpen(false);
    };

    // open dialog Tipo Producto
    const [openTipo, setopenTipo] = React.useState(false);
    const OpenDialogTipo = () => {
        setopenTipo(true);
    };
    const CloseDialogTipo = () => {
        setopenTipo(false);
    };
    // open dialog MEdida
    const [openMedida, setopenMedida] = React.useState(false);
    const OpenDialogMedida = () => {
        setopenMedida(true);
    };
    const CloseDialogMedida = () => {
        setopenMedida(false);
    };

    // open dialog Presentacion
    const [openPresentacion, setopenPresentacion] = React.useState(false);
    const openDialogPresentacion = () => {
        setopenPresentacion(true);
    };
    const CloseDialogPresentacion = () => {
        setopenPresentacion(false);
    };

    // open dialog Clasificacion
    const [openClasificacion, setopenClasificacion] = React.useState(false);
    const openDialogClasificacion = () => {
        setopenClasificacion(true);
    };
    const CloseDialogClasificacion = () => {
        setopenClasificacion(false);
    };

    return (
        <MainCard title="Catalogo de Productos" content={false}>
            <ButtonGroup fullWidth size="large" aria-label="large button group">
                <Button key="clasificacion" color="success" onClick={openDialogClasificacion} startIcon={<InventoryIcon />}>
                    Clasificación
                </Button>
                <Button key="presentacion" color="primary" onClick={openDialogPresentacion} startIcon={<VaccinesIcon />}>
                    Presentación
                </Button>
                <Button key="unidad" color="secondary" onClick={OpenDialogMedida} startIcon={<AddchartIcon />}>
                    Unidad de Medida
                </Button>
                <Button key="tipo" color="dark" onClick={OpenDialogTipo} startIcon={<ProductionQuantityLimitsIcon />}>
                    Tipo Producto
                </Button>
            </ButtonGroup>
            <CardContent>
                <FromProducto />
            </CardContent>
            <ReviewEdit open={open} handleCloseDialog={handleCloseDialog} />
            <TipoProducto open={openTipo} handleCloseDialog={CloseDialogTipo} />
            <Medida open={openMedida} handleCloseDialog={CloseDialogMedida} />
            <Presentacion open={openPresentacion} handleCloseDialog={CloseDialogPresentacion} />
            <Clasificacion open={openClasificacion} handleCloseDialog={CloseDialogClasificacion} />
        </MainCard>
    );
};

export default ProductReviewList;
