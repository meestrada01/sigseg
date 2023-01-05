const serviceToken = window.localStorage.getItem('serviceToken');

export const FileExcel = () => ({
    responseType: 'arraybuffer',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.ms-excel',
        Authorization: serviceToken
    }
});

export const FechaActual = () => {
    const date = new Date();
    return date;
};
