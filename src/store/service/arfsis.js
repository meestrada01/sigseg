import { axiosSegurgo } from 'utils/axios';
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
