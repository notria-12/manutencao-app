import React from 'react';
import {useParams} from 'react-router-dom'
import './ActivitiesList.css'


const ActivitiesList = (props) =>{
    const {date} = useParams()

    console.log("Data", date)
    return(
        <div className='activities'>
            <div className='table-activities'>
                <h2>Aqui</h2>
            </div>

        </div>
    )
}

export default ActivitiesList