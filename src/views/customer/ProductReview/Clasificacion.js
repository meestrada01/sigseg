import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Estado } from '../../../json';

// material-ui
import {
    Button,
    Dialog,
    FormHelperText,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
    Stack,
    InputLabel,
    Select
} from '@mui/material';

import { useDispatch } from 'store';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { postClasificacion } from 'store/slices/inventario';
import toast from 'react-hot-toast';

import ClasificacionLis from './ClasificacionLis';

const Clasificacion = ({ open, handleCloseDialog }) => {
    const dispatch = useDispatch();
    const Guardar = async (u) => {
        const { detalle } = u;
        let Val1 = true;
        if (detalle.length < 5) {
            toast.error('Detalle Invalido.');
            Val1 = false;
        }
        if (Val1) {
            await dispatch(postClasificacion(u));
        }
    };

    const validationSchema = yup.object({
        detalle: yup.string().min(5, 'Tipo Minimo 5 Caracteres').required('Requiere Tipo de Producto'),
        estado: yup.number().required('Requiere Estado')
    });

    const formik = useFormik({
        initialValues: {
            id: 0,
            detalle: '',
            estado: 0
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            Guardar(values);
            resetForm();
        }
    });

    const ResetFormulario = () => {
        formik.resetForm();
    };

    const ItemsTipoProducto = (data) => {
        const { id, detalle, estado } = data;
        formik.setFieldValue('id', id);
        formik.setFieldValue('detalle', detalle);
        formik.setFieldValue('estado', estado);
    };

    // handle star rating
    return (
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="lg">
            {open && (
                <>
                    <DialogTitle>Clasificacion de Producto</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ my: 0 }}>
                            <Grid item xs={6} md={4}>
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid item xs={12} md={12} style={{ display: formik.values.id === 0 ? 'none' : 'block' }}>
                                        <Stack>
                                            <InputLabel required> Codigo</InputLabel>
                                            <TextField
                                                id="id"
                                                name="id"
                                                disabled
                                                value={formik.values.id}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.detalle && Boolean(formik.errors.id)}
                                                helperText={formik.touched.detalle && formik.errors.id}
                                                onChange={formik.handleChange}
                                                inputProps={{ autoComplete: 'off' }}
                                                fullWidth
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Stack>
                                            <InputLabel required> Clasificacion </InputLabel>
                                            <TextField
                                                id="detalle"
                                                name="detalle"
                                                value={formik.values.detalle}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.detalle && Boolean(formik.errors.detalle)}
                                                helperText={formik.touched.detalle && formik.errors.detalle}
                                                onChange={formik.handleChange}
                                                inputProps={{ autoComplete: 'off' }}
                                                fullWidth
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Stack>
                                            <InputLabel required>Tipo Proceso</InputLabel>
                                            <Select
                                                id="estado"
                                                name="estado"
                                                defaultValue={formik.values.estado}
                                                value={formik.values.estado}
                                                onChange={formik.handleChange}
                                            >
                                                {Estado.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {formik.errors.estado && <FormHelperText error>{formik.errors.estado}</FormHelperText>}
                                        </Stack>
                                    </Grid>
                                    <br />
                                    <Grid item xs={6} md={12}>
                                        <AnimateButton>
                                            <Button fullWidth type="submit" variant="contained" color="success">
                                                {formik.values.id === 0 ? 'Guardar Registro' : 'Editar Registro'}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <br />
                                    <Grid item xs={6} md={12}>
                                        <AnimateButton>
                                            <Button fullWidth color="inherit" variant="contained" onClick={() => ResetFormulario()}>
                                                Cancelar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </form>
                            </Grid>
                            <Grid item xs={6} md={8}>
                                <ClasificacionLis ItemsTipoProducto={ItemsTipoProducto} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color="inherit" variant="contained" onClick={handleCloseDialog}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

Clasificacion.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default Clasificacion;
