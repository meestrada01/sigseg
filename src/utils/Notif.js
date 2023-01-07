import toast from 'react-hot-toast';

// eslint-disable-next-line import/prefer-default-export
export const NotifError = (error) => {
    const { data } = error;
    if (!data.status) {
        toast.error(data.error);
        toast.error(data.Message);
    }
};

export const NotifErrorService = (error) => {
    toast.error(error);
};

export const NotifiOk = (respon) => {
    const { status, data, message } = respon;
    if (status) {
        toast.success(data);
    } else {
        toast.error(message);
        toast(data);
    }
};

export const NotiSuccess = (data) => {
    toast.success(data);
};
