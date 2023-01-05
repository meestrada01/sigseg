// third-party
import { createSlice } from '@reduxjs/toolkit';
// project imports
import axios from 'utils/axios';
// import { NotifError, NotifiOk } from 'utils/Notif';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const initialState = {
    error: null,
    puntosDigitacion: []
};

const slice = createSlice({
    name: 'arfsis',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET Lista de Productos
        getPuntosSISActivos(state, action) {
            state.puntosDigitacion = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function GetPuntosDigitacionAfsisActivos(periodo, meses, odbsis) {
    return async () => {
        try {
            const { data } = await axios.get(`v1/gestionconsolidacion/arfsis/ppd/${periodo}/${meses}/${odbsis}`);
            dispatch(slice.actions.getPuntosSISActivos(data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

/*
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
} */
