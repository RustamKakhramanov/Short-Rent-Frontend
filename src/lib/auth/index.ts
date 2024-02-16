import { PhoneProvider } from './providers';
import { AuthProvider } from 'react-admin';

const Auth: AuthProvider = {
    provder: '',
    resolveProvider: (provider?: string) => {
        switch (provider) {
            default:
                return PhoneProvider;
                break;
    }
    },
    login: (params: any) => {
        return Auth.resolveProvider(Auth.provder).login(params);
    },
    logout: () => {
        return Auth.resolveProvider(Auth.provder).logout();
    },
    checkError: () => Auth.resolveProvider(Auth.provder).checkError(),
    checkAuth: () => Auth.resolveProvider(Auth.provder).checkAuth(),
    getPermissions: () => Auth.resolveProvider(Auth.provder).getPermissions(),
    getIdentity: () => Auth.resolveProvider(Auth.provder).getIdentity(),
};

export default Auth;