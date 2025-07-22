import { useContext } from 'react';
import { AuthContext } from './context.jsx';

export const useAuth = () => useContext(AuthContext);
