
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'

const ChooseForm = () =>{

    const [forms, setForms] = useState([]);

    useEffect(() => {
       const unsubscribe =  db.collection('activities_forms').where('finalized', "==", false).onSnapshot(snapshot => setForms(snapshot.docs.map( docForm => {return {...docForm.data(), id: docForm.id}})))

       return () => {
           unsubscribe()
       }
    })


    return (
        
        <div className='container d-flex flex-wrap'>
            <div className='card col-8 m-2' >
               <div className='card-body p-2'>
                 <div  className='d-flex flex-column align-items-center'>
                   {
                      forms.map(
                          form => <Link to={`/keeping/${form.id}`}><button className='card'><div className='d-flex'><h6>{form.title}</h6> </div></button></Link>
                      )
                   }
                 </div>
               </div>
            </div>

        </div>
    )
}

export default ChooseForm