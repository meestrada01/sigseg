// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import inventarioReducer from './slices/inventario';
import arfsisReducer from './slices/arfsis';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    inventario: inventarioReducer,
    arfsis: arfsisReducer
});

export default reducer;
