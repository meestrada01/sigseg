import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'store';
// routes
import AuthenticationRotes from './AuthenticationRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { drawerOpen } = useSelector((state) => state.menu);
    const [itemsroute, setitemsroute] = useState(MainRoutes);
    useEffect(() => {
        setitemsroute(MainRoutes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);
    // ==============================|| APP ||============================== //
    return useRoutes([LoginRoutes, AuthenticationRotes, itemsroute]);
}
