import axios from 'utils/axios';
import { NotifError } from 'utils/Notif';

// eslint-disable-next-line import/prefer-default-export, consistent-return
export const getOBDSIS = async () => {
    try {
        const { data } = await axios.get(`v1/catalogo/odbsis`);
        return data.data;
    } catch (error) {
        NotifError(error);
    }
};
