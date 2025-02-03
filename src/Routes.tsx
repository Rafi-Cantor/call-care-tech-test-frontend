import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/store';
import { User } from './types/types';
import { toast } from 'react-toastify';

export const AdminRoute = ({ children }: { children: JSX.Element  }): JSX.Element | null => {
    const user: User = useSelector((state: RootState) => state.user);
    
    if (!user.is_authenticated) {
        return <Navigate to="/"/>; 
    }
    if (!user.is_admin) {
        toast.error('This page is only accessible to admin. ');
        return null; 
    }
    return children;
};

export const EmployeeRoute = ({ children }: { children: JSX.Element }): JSX.Element | null => {
    const user: User = useSelector((state: RootState) => state.user);
    
    if (!user.is_authenticated) {
        return <Navigate to="/"/>; 
    }
    if (user.is_admin) {
        toast.error('This page is only accessible to employees. ');
        return null;
    }
    return children;
};