import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Header from '../header';
import Footer from '../footer';
import { iParent } from '../../interfaces';
import Error from 'next/error';
import { AppContext } from '../../providers/AppProvider';
import { useContext } from 'react';


export default function Layout({ children }: iParent) {
    const { error } = useContext(AppContext);

    return <div>
        {error?.code && process.env.ERROR_CONTROL == 'false' ? <Error statusCode={error?.code} title={error?.message} /> :

            <React.Fragment>
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
                <Header />
                {/* Hero unit */}
                <Container disableGutters component="main" sx={{ pt: 8, pb: 6 }}>
                    {children}
                </Container>
                {/* End hero unit */}

                {/* Footer */}
                <Footer />
                {/* End footer */}
            </React.Fragment>

        }
    </div>
}