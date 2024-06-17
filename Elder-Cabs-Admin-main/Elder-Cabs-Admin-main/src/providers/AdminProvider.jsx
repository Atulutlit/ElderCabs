import { useEffect, useState } from 'react';
import { AdminContext } from '../contexts';
import Cookies from 'js-cookie';
import authApi from '../api/auth';

const AdminProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(null);

    // logout
    const logout = () => {
        Cookies.remove('elder_cabs_admin');
        window.location.pathname = '/';
    }

    useEffect(() => {
        if (Cookies.get('elder_cabs_admin')) {
            (async () => {
                try {
                    const res = await authApi.validateAdmin();
                    setAdmin(res.data);
                } catch (err) {
                    setAdmin(null);
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setAdmin(null);
            setLoading(false);
        }
    }, []);

    return (
        <AdminContext.Provider value={{ loading, admin, logout }}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminProvider;
