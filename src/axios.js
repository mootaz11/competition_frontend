import axios from 'axios';

const uri = "http://localhost:4000"



export const getEntreprises = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${uri}/entreprise`).then(res=>{
            resolve(res.data.entreprises);
        })
        .catch(err=>{reject(err)})
    })
}