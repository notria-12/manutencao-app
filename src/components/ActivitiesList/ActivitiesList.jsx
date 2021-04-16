import React from 'react';
import { useParams } from 'react-router-dom'
import './ActivitiesList.css'


const ActivitiesList = (props) => {
    const { date } = useParams()

    const activities = [
        {
            id: 0,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano "
        },
        {
            id: 1,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'Chiler',
            tec: "Beltrano"
        },
        {
            id: 2,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'CHILER',
            tec: "Beltrano"
        },
        {
            id: 3,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano "
        },
        {
            id: 4,
            activity: 'INSPECIONAR ROSCA SEM FIM',
            freq: 15,
            machine: 'ROTULADORA',
            tec: "CICLANO "
        },
        {
            id: 5,
            activity: 'INSPECIONAR AJUSTE DAS ESTRELAS',
            freq: 14,
            machine: 'ENVASADORA',
            tec: "Fulano "
        },
        {
            id: 6,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano "
        },
        {
            id: 7,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'Chiler',
            tec: "Beltrano"
        },
        {
            id: 8,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'CHILER',
            tec: "Beltrano"
        },
        {
            id: 0,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano "
        },
        {
            id: 1,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'Chiler',
            tec: "Beltrano"
        },
        {
            id: 2,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'CHILER',
            tec: "Beltrano"
        },
        {
            id: 3,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano "
        },
        {
            id: 4,
            activity: 'INSPECIONAR ROSCA SEM FIM',
            freq: 15,
            machine: 'ROTULADORA',
            tec: "CICLANO "
        },
        {
            id: 5,
            activity: 'INSPECIONAR AJUSTE DAS ESTRELAS',
            freq: 14,
            machine: 'ENVASADORA',
            tec: "Fulano "
        },
        {
            id: 6,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano "
        },
        {
            id: 7,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'Chiler',
            tec: "Beltrano"
        },
        {
            id: 8,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'CHILER',
            tec: "Beltrano"
        },


    ]

    
    return (
        <div className='activities'>
            <h3>Atividades do dia {date}</h3>
            <div className='table-activities'>
                
                <table className="table table-striped table-info text-primary">
                    <thead className='header' >
                        <tr>
                            <th scope="col" className="header">Atividade</th>
                            <th scope="col" className="header">Frequência</th>
                            <th scope="col" className="header">Técnico</th>
                            <th scope="col" className="header">Máquina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activities.map((activity, i) => {
                                return <tr key={i} onClick={() => console.log(activity.id)}>
                                    <td>{activity.activity}</td>
                                    <td>{activity.freq}</td>
                                    <td>{activity.tec}</td>
                                    <td>{activity.machine}</td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default ActivitiesList