import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { userService } from '../../lib/user';

import { iParent } from '../../interfaces';

export default function UnAuthorized({ children }: iParent) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url?: string) {
        const crashRoute = () => {
            setAuthorized(false);
            router.push({
                pathname: '/',
                //  query: { returnUrl: router.asPath }
            });
        }
        if (userService.userValue) {
            crashRoute();

        } else {
            setAuthorized(true);
        }
    }

    return (<React.Fragment>{authorized && children}</React.Fragment>);

}