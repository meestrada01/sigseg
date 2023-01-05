import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import jwtDecode from 'jwt-decode';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const GestionArfsis = Loadable(lazy(() => import('views/arfsis')));
const FormularioFua = Loadable(lazy(() => import('views/formatounicoatencion/formulario')));
// ==============================|| MAIN ROUTING ||============================== //
const token = localStorage.getItem('serviceToken');

function Componentes(Idmod) {
    const encript = jwtDecode(token);
    const respo = JSON.parse(encript.Componentes);
    const modulo = respo.filter((Obj) => Obj.mod === Idmod);
    const modhome =
        modulo.findIndex((Obj) => Obj.componente === 'home') >= 0
            ? {
                  path: '/home',
                  element: <SamplePage />
              }
            : {};
    const modproductos =
        modulo.findIndex((Obj) => Obj.componente === 'arfsis') >= 0
            ? {
                  path: '/arfsis',
                  element: <GestionArfsis />
              }
            : {};
    const modformfua =
        modulo.findIndex((Obj) => Obj.componente === 'formfua') >= 0
            ? {
                  path: '/formfua',
                  element: <FormularioFua />
              }
            : {};

    const data = [
        {
            path: '/',
            element: <SamplePage />
        },
        modhome,
        modproductos,
        modformfua
    ];

    return data;
}

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: token ? Componentes(0) : []
};

export default MainRoutes;
