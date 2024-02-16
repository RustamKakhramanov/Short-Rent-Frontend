import { useContext,useEffect } from "react";
import { AppContext } from "../../providers/AppProvider";
import React from 'react';

export function Abort({code, message} : {code: number, message?: string}) {
    const { setError } = useContext(AppContext);
       useEffect(()=>{
        if (process.env.ERROR_CONTROL == 'false') {
            setError?.({ code, message })
        }
       })

       return (<React.Fragment>{null}</React.Fragment>);
   
}





