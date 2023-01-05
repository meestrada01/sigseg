// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="45"
            viewBox="0 0 495.000000 169.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <g transform="translate(0.000000,169.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path
                    d="M600 1664 c-100 -17 -145 -31 -219 -66 -160 -76 -291 -238 -336 -413
-20 -77 -19 -230 1 -309 22 -88 76 -191 139 -266 101 -119 196 -243 317 -412
65 -91 125 -171 133 -178 34 -28 62 -3 176 158 151 210 211 289 308 402 88
103 140 196 166 300 25 94 16 260 -17 357 -84 238 -314 414 -559 427 -46 3
-95 3 -109 0z m210 -184 c220 -64 366 -297 330 -528 -30 -193 -176 -353 -361
-397 -263 -62 -515 94 -584 360 -53 208 58 442 259 540 115 57 221 64 356 25z"
                    fill={theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.grey[900]}
                />
                <path
                    d="M382 1308 c-9 -9 -12 -86 -12 -285 0 -259 1 -273 19 -283 12 -6 118
-10 275 -10 243 0 257 1 276 20 19 19 20 33 20 273 0 212 -2 256 -16 275 -15
22 -18 22 -283 22 -194 0 -270 -3 -279 -12z m316 -160 l3 -87 87 -3 87 -3 0
-30 0 -30 -87 -3 -88 -3 0 -74 c0 -93 -5 -105 -41 -105 l-29 0 0 90 0 89 -87
3 -88 3 -3 33 -3 32 90 0 91 0 0 91 0 90 33 -3 32 -3 3 -87z"
                    fill={theme.palette.primary.main}
                />
            </g>
        </svg>
    );
};

export default Logo;
