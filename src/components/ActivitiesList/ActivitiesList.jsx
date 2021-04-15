import React from 'react';
import {useParams} from 'react-router-dom'


const ActivitiesList = (props) =>{
    const {date} = useParams()
    return(
        <div className='activities'>
            <h2>{date}</h2>

        </div>
    )
}

export default ActivitiesList