import * as React from 'react';
import toast from 'react-hot-toast';
// import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Estado } from '../../../json';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    MenuItem,
    TextField,
    InputLabel,
    Select,
    FormControl,
    FormControlLabel,
    Switch
} from '@mui/material';

// Store
import { useDispatch, useSelector } from 'store';
import { postProducto, getClasificacion, getMedida, getPresentacion, getTipoProducto } from 'store/slices/inventario';
import ProductosLis from './ProductosLis';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

const FromProducto = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getPresentacion());
        dispatch(getTipoProducto());
        dispatch(getMedida());
        dispatch(getClasificacion());
    }, [dispatch]);

    const { tipoproducto, medida, presentacion, clasificacion } = useSelector((state) => state.inventario);

    const Guardar = async (u) => {
        const { stockmin, stockmax } = u;
        let v1 = true;
        if (stockmax <= stockmin) {
            console.log('error');
            toast.error('El StocK Minimo no puede ser Mayor Maximo');
            v1 = false;
        }
        if (v1) {
            await dispatch(postProducto(u));
        }
    };

    const { values, handleSubmit, errors, touched, getFieldProps, resetForm, setValues } = useFormik({
        initialValues: {
            id: 0,
            codigo: '',
            idpresentacion: 1,
            idtipo: 1,
            idunidadmedida: 1,
            idclasificacion: 1,
            detalle: '',
            stockmin: 0,
            stockmax: 999,
            concentracion: '',
            receta: false,
            expira: false,
            idestado: 0
        },
        validationSchema: yup.object({
            codigo: yup.string().min(5, 'Minimo 5 Caracteres').required('Requiere Codigo'),
            detalle: yup.string().min(5, 'Tipo Minimo 5 Caracteres').required('Requiere Tipo de Producto'),
            stockmin: yup.number().min(1, 'Valor Minimo 1').required('Stock Minimo'),
            stockmax: yup.number().min(10, 'Valor Minimo 10').required('Stock Maximo').optional(),
            concentracion: yup.string().min(1, 'Minimo 1 Caracteres').required('Requiere Tipo de Producto'),
            idestado: yup.number().required('Requiere Estado')
        }),
        onSubmit: (v) => {
            Guardar(v);
            setValues({
                id: 0,
                codigo: '',
                idpresentacion: v.idpresentacion,
                idtipo: v.idtipo,
                idunidadmedida: v.idunidadmedida,
                idclasificacion: v.idclasificacion,
                detalle: '',
                stockmin: 1,
                stockmax: 999,
                concentracion: '',
                receta: false,
                expira: false,
                idestado: 0
            });
        }
    });

    const ClearForm = () => {
        resetForm();
    };
    /*
    React.useEffect(() => {
        console.log(values);
    }, [values]); */
    // Value Editar
    const ItemsProductos = (row) => {
        const {
            id,
            codigo,
            idpresentacion,
            idtipo,
            idunidadmedida,
            idclasificacion,
            detalle,
            stockmin,
            stockmax,
            concentracion,
            receta,
            expira,
            idestado
        } = row;
        setValues({
            id,
            codigo,
            idpresentacion,
            idtipo,
            idunidadmedida,
            idclasificacion,
            detalle,
            stockmin,
            stockmax,
            concentracion,
            receta,
            expira,
            idestado
        });
    };

    // Formulario de Registro
    return (
        <Grid container>
            <form onSubmit={handleSubmit}>
                <Grid container item spacing={gridSpacing} xs={12} md={12}>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <TextField
                                label="Id"
                                {...getFieldProps('id')}
                                disabled
                                error={touched.id && Boolean(errors.id)}
                                helperText={touched.id && errors.id}
                                inputProps={{ autoComplete: 'off' }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="Codigo"
                                disabled={values.id !== 0}
                                {...getFieldProps('codigo')}
                                error={touched.codigo && Boolean(errors.codigo)}
                                helperText={touched.codigo && errors.codigo}
                                inputProps={{ autoComplete: 'off' }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel required>Clasificacion</InputLabel>
                            <Select {...getFieldProps('idclasificacion')} label="Clasificacion">
                                {clasificacion.map((option) => (
                                    <MenuItem key={option.id} value={option.id} disabled={option.estado === 1}>
                                        {option.detalle}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.idclasificacion && <FormHelperText error>{errors.idclasificacion}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel required>Presentacion</InputLabel>
                            <Select label="Presentacion" {...getFieldProps('idpresentacion')}>
                                {presentacion.map((option) => (
                                    <MenuItem key={option.id} value={option.id} disabled={option.estado === 1}>
                                        {option.detalle}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.idpresentacion && <FormHelperText error>{errors.idpresentacion}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel required>Unidad Medida</InputLabel>
                            <Select {...getFieldProps('idunidadmedida')} label="Unidad Medida">
                                {medida.map((option) => (
                                    <MenuItem key={option.id} value={option.id} disabled={option.estado === 1}>
                                        {option.detalle}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.idunidadmedida && <FormHelperText error>{errors.idunidadmedida}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel required>Tipo</InputLabel>
                            <Select {...getFieldProps('idtipo')} label="Tipo">
                                {tipoproducto.map((option) => (
                                    <MenuItem key={option.id} value={option.id} disabled={option.estado === 1}>
                                        {option.detalle}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.idtipo && (
                                <FormHelperText error id="idtipo">
                                    {errors.idtipo}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            required
                            label="Detalle"
                            {...getFieldProps('detalle')}
                            error={touched.detalle && Boolean(errors.detalle)}
                            helperText={touched.detalle && errors.detalle}
                            inputProps={{ autoComplete: 'off' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            required
                            label="Concentracion"
                            {...getFieldProps('concentracion')}
                            error={touched.concentracion && Boolean(errors.concentracion)}
                            helperText={touched.concentracion && errors.concentracion}
                            inputProps={{ autoComplete: 'off' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Stock Minimo"
                            required
                            {...getFieldProps('stockmin')}
                            error={touched.stockmin && Boolean(errors.stockmin)}
                            helperText={touched.stockmin && errors.stockmin}
                            inputProps={{ autoComplete: 'off' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Stock Maximo"
                            required
                            {...getFieldProps('stockmax')}
                            error={touched.stockmax && Boolean(errors.stockmax)}
                            helperText={touched.stockmax && errors.stockmax}
                            inputProps={{ autoComplete: 'off' }}
                        />
                    </Grid>
                    <Grid item xs={3} md={0.5}>
                        <InputLabel>Receta</InputLabel>
                        <FormControlLabel control={<Switch checked={values.receta} {...getFieldProps('receta')} color="primary" />} />
                    </Grid>
                    <Grid item xs={3} md={0.5}>
                        <InputLabel>Expira</InputLabel>
                        <FormControlLabel control={<Switch checked={values.expira} {...getFieldProps('expira')} color="primary" />} />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <FormControl fullWidth>
                            <InputLabel required>Estado</InputLabel>
                            <Select label="Estado" {...getFieldProps('idestado')}>
                                {Estado.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.idestado && <FormHelperText error>{errors.idestado}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={1}>
                        <AnimateButton>
                            <Button type="submit" variant="contained" color={values.id === 0 ? 'success' : 'primary'} fullWidth>
                                {values.id === 0 ? 'Guardar' : 'Editar'}
                            </Button>
                        </AnimateButton>
                    </Grid>
                    <Grid item xs={6} md={1}>
                        <AnimateButton>
                            <Button fullWidth color="inherit" variant="contained" onClick={() => ClearForm()}>
                                Cancelar
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </form>
            <Grid item xs={12} md={12}>
                <ProductosLis ItemsProductos={ItemsProductos} />
            </Grid>
        </Grid>
    );
};

FromProducto.propTypes = {};

export default FromProducto;
