import * as moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const ParceSim = (fecha) => moment(fecha).format('YYYY-MM-DDTHH:mm:ss');
export const ParceEn = (fecha) => moment(fecha).format();

const googleDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})([+-]\d{2}):(\d{2})$/;

export function parseGoogleDate(d) {
    const m = googleDate.exec(d);
    const year = +m[1];
    const month = +m[2];
    const day = +m[3];
    const hour = +m[4];
    const minute = +m[5];
    const second = +m[6];
    const msec = +m[7];
    const tzHour = +m[8];
    const tzMin = +m[9];
    const tzOffset = tzHour * 60 + tzMin;

    return Date.UTC(year, month - 1, day, hour, minute - tzOffset, second, msec);
}
