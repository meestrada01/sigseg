import axios from 'utils/axios';
import { NotifError } from 'utils/Notif';

// eslint-disable-next-line import/prefer-default-export, consistent-return
export const getContactsfil = async (Buscar) => {
    try {
        const { data } = await axios.patch(`v1/catalogo/contacto/${Buscar}`);
        return data.data;
    } catch (error) {
        NotifError(error);
    }
};
