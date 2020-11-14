import globalContext from './globalContext';
import {useState} from 'react'


export default function   AppContext  (props) {
    const [entreprise,setEntreprise]= useState(null);


    const handleEntreprise = (_entreprise)=>{
        setEntreprise(_entreprise);
    }



    return (
        <globalContext.Provider value={
            {
                entreprise: entreprise,
                handleEntreprise:handleEntreprise
            }
        }>
            {props.children}
        </globalContext.Provider>
    )

}