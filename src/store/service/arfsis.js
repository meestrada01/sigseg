import axios, { axiosSegurgo } from 'utils/axios';
import { NotifErrorService } from 'utils/Notif';

// eslint-disable-next-line import/prefer-default-export, consistent-return
export const getMigracionData = async (periodo, meses, idbase, idpunto) => {
    try {
        const { data } = await axiosSegurgo.get(
            `v1/tramas/arfsis/migrar?periodo=${periodo}&inicio=${meses}&fin=${meses}&base=${idbase}&ppd=${idpunto}`
        );
        return data.data;
    } catch (error) {
        NotifErrorService(error.message);
    }
};

// eslint-disable-next-line import/prefer-default-export, consistent-return
export const getVerificarMigracion = async (codigo, observacion) => {
    const json = {
        idmigracion: codigo,
        observacion
    };
    try {
        const { data } = await axios.post(`v1/gestionconsolidacion/arfsis/verificar`, json);
        return data.data;
    } catch (error) {
        NotifErrorService(error.message);
    }
};
