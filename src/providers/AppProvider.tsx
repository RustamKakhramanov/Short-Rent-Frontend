import React, { useState, FC, createContext } from 'react';
import { iParent } from '../interfaces/index';
interface Iprops {
    value: {
        error: string,
        setError: any
    },
    children: React.ReactNode
}

interface IAppContext {
    error: ErrorObjcet,
    setError?: (code: ErrorObjcet) => void,
    progress: boolean,
    setProgress?: (value: boolean) => void,
    alert: Alert
}

interface Alert {
    openAlert: boolean;
    setOpenAlert?: (val: boolean) => void;
}

interface ErrorObjcet { code: number, message?: string }

export const AppContext = createContext<Partial<IAppContext>>({});

export const AppProvider = ({ children }: iParent) => {
    const [error, setError] = useState<ErrorObjcet | undefined>();
    const [progress, setProgress] = useState<boolean>(false);
    // const [openAlert, setOpenAlert] = useState(false);
    // const [alertMessage, setAlertMessage] = useState(false);

    // const alert = {
    //     isOpen, setOpen, message, setMessage
    // }

    return (
        <AppContext.Provider
            value={{
                error,
                setError: (error) => setError(error),
                progress,
                setProgress: (value:boolean) => setProgress(value),
                // openAlert,
                // setOpenAlert: (val: boolean) => setOpenAlert(val),
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
