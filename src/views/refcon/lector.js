import { axiosPdf } from 'utils/axios';
import { NotifErrorService, NotiSuccess } from 'utils/Notif';
// eslint-disable-next-line import/prefer-default-export, consistent-return
export const Lectorjs = async () => {
    const formData = new FormData();
    const fileInput = document.querySelector('#refconfile');
    formData.append('file', fileInput.files[0]);
    try {
        const { data } = await axiosPdf.post(`v1/refcon/cargar`, formData);
        if (data) {
            const { numero } = JSON.parse(data.data);
            NotiSuccess(`Referencia ${numero}.`);
        }
        return JSON.parse(data.data);
    } catch (error) {
        NotifErrorService(error.message);
    }
};

export const Guardar = async (numero) => {
    NotiSuccess(`Referencia Guardo ${numero}.`);
};
