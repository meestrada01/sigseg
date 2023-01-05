// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
import { NotifError, NotifiOk } from 'utils/Notif';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const initialState = {
    error: null,
    tipoproducto: [{ id: 1, detalle: 'seleccione', estado: 1 }],
    postipoproducto: [],
    medida: [{ id: 1, detalle: 'seleccione', estado: 1 }],
    postmedida: [],
    presentacion: [{ id: 1, detalle: 'seleccione', estado: 1 }],
    postpresentacion: [],
    clasificacion: [{ id: 1, detalle: 'seleccione', estado: 1 }],
    ordens: [],
    orden: {},
    productos: [],
    producto: {},
    almacenes: [{ id: 1, nombre: 'seleccione', estado: 1 }],
    empresas: [{ id: 1, empresa: 'seleccione', estado: 1 }]
};

const slice = createSlice({
    name: 'inventario',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET Lista de Productos
        getTipoProducto(state, action) {
            state.tipoproducto = action.payload;
        },
        // POST de Producto
        postTipoProducto(state, action) {
            state.postipoproducto = action.payload;
        },
        // GET Lista de Medida
        getMedida(state, action) {
            state.medida = action.payload;
        },
        // POST de Medida
        postMedida(state, action) {
            state.postmedida = action.payload;
        },
        // GET Lista de Presentacion
        getPresentacion(state, action) {
            state.presentacion = action.payload;
        },
        // POST de Presentacio
        postPresentacion(state, action) {
            state.postpresentacion = action.payload;
        },
        // GET Lista de clasificacion
        getClasificacion(state, action) {
            state.clasificacion = action.payload;
        },
        // POST de clasificacion
        postClasificacion(state, action) {
            state.postclasificacion = action.payload;
        },
        // GET Listar Producto
        getProducto(state, action) {
            state.productos = action.payload;
        },
        // POST PUT - Producto
        postProducto(state, action) {
            state.producto = action.payload;
        },
        // GET Listar Almacenes
        getalmacenes(state, action) {
            state.almacenes = action.payload;
        },
        // GET Listar Empresas
        getempresas(state, action) {
            state.empresas = action.payload;
        },
        // GET Listar Ordenes
        getOrden(state, action) {
            state.ordens = action.payload;
        },
        // POST PUT - Orden
        postOrden(state, action) {
            state.orden = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getTipoProducto() {
    return async () => {
        try {
            const { data } = await axios.get('/v1/inventario/tipoproducto');
            dispatch(slice.actions.getTipoProducto(data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postTipoProducto(objeto) {
    return async () => {
        try {
            const { data } = await axios.post('/v1/inventario/tipoproducto', objeto);
            NotifiOk(data);
            dispatch(slice.actions.postTipoProducto(data.data));
        } catch (error) {
            NotifError(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getMedida() {
    return async () => {
        try {
            const { data } = await axios.get('/v1/inventario/medida');
            dispatch(slice.actions.getMedida(data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postMedida(objeto) {
    return async () => {
        try {
            const { data } = await axios.post('/v1/inventario/medida', objeto);
            NotifiOk(data);
            dispatch(slice.actions.postMedida(data.data));
        } catch (error) {
            NotifError(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getPresentacion() {
    return async () => {
        try {
            const { data } = await axios.get('/v1/inventario/presentacion');
            dispatch(slice.actions.getPresentacion(data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postPresentacion(objeto) {
    return async () => {
        try {
            const { data } = await axios.post('/v1/inventario/presentacion', objeto);
            NotifiOk(data);
            dispatch(slice.actions.postPresentacion(data.data));
        } catch (error) {
            NotifError(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getClasificacion() {
    return async () => {
        try {
            const { data } = await axios.get('/v1/inventario/clasificacion');
            dispatch(slice.actions.getClasificacion(data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postClasificacion(objeto) {
    return async () => {
        try {
            const { data } = await axios.post('/v1/inventario/clasificacion', objeto);
            NotifiOk(data);
            dispatch(slice.actions.postClasificacion(data.data));
        } catch (error) {
            NotifError(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProducto() {
    return async () => {
        try {
            const { data } = await axios.get('/v1/inventario/producto');
            dispatch(slice.actions.getProducto(data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postProducto(objeto) {
    return async () => {
        try {
            const { data } = await axios.post('/v1/inventario/producto', objeto);
            NotifiOk(data);
            dispatch(slice.actions.postProducto(data.data));
        } catch (error) {
            NotifError(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getalmacenes() {
    return async () => {
        try {
            const { data } = await axios.get('/v1/inventario/almacen');
            dispatch(slice.actions.getalmacenes(data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getempresas() {
    return async () => {
        try {
            const { data } = await axios.get('/v1/inventario/empresa');
            dispatch(slice.actions.getempresas(data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOrden() {
    return async () => {
        try {
            const { data } = await axios.get('/v1/inventario/orden');
            dispatch(slice.actions.getOrden(data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postOrden(objeto) {
    return async () => {
        try {
            const { data } = await axios.post('/v1/inventario/orden', objeto);
            NotifiOk(data);
            dispatch(slice.actions.postOrden(data.data));
        } catch (error) {
            NotifError(error);
            dispatch(slice.actions.hasError(error));
        }
    };
}
