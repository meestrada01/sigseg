import { axiosFiles } from 'utils/axios';
import toast from 'react-hot-toast';

export function abrirFormatoConsulta(codigo) {
    return async () => {
        try {
            const data = await axiosFiles.get(`v1/formatos/consulta/${codigo}`);
            toast.success('Generado Con Exito.', {
                position: 'bottom-center'
            });
            const file = new Blob([data.data], { type: 'application/pdf' });
            const fileURL = window.URL.createObjectURL(file);
            window.open(fileURL, 'Comprobante', 'location=yes, toolbar=1, scrollbars=1, resizable=1, width=1255 , height=900');
        } catch (error) {
            toast.error(`Error Servidor:${error}`, {
                position: 'bottom-center'
            });
        }
    };
}

export default abrirFormatoConsulta;
