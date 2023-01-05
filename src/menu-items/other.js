import { FormattedMessage } from 'react-intl';
import jwtDecode from 'jwt-decode';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
// assets
import { IconFileInvoice, IconBrandChrome, IconHelp, IconSitemap, IconFileSpreadsheet } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    ContactPageOutlinedIcon,
    IconFileInvoice,
    IconFileSpreadsheet
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //
const token = localStorage.getItem('serviceToken');

function Componentes(Idmod) {
    const encript = jwtDecode(token);
    const respo = JSON.parse(encript.Componentes);
    const modulo = respo.filter((Obj) => Obj.mod === Idmod);
    const modhome =
        modulo.findIndex((Obj) => Obj.componente === 'home') >= 0
            ? {
                  id: 1,
                  title: <FormattedMessage id="home" />,
                  type: 'item',
                  url: '/home',
                  icon: icons.IconBrandChrome,
                  breadcrumbs: false
              }
            : {};
    const modproductos =
        modulo.findIndex((Obj) => Obj.componente === 'arfsis') >= 0
            ? {
                  id: 2,
                  title: <FormattedMessage id="arfsis" />,
                  type: 'item',
                  url: '/arfsis',
                  icon: icons.IconSitemap,
                  breadcrumbs: false
              }
            : {};

    const modformfua =
        modulo.findIndex((Obj) => Obj.componente === 'formfua') >= 0
            ? {
                  id: 3,
                  title: <FormattedMessage id="Formato Fua" />,
                  type: 'item',
                  url: '/formfua',
                  icon: icons.IconFileSpreadsheet,
                  breadcrumbs: false
              }
            : {};

    const data = [modhome, modproductos, modformfua];
    const modautorizado = data.filter((Obj) => Obj.id > 0);
    return modautorizado;
}

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: token ? Componentes(0) : []
};

export default other;
