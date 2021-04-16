import React, { useState } from 'react';
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

    const [infoActivity, setActivity] = useState({})


    return (
        <div className='activities'>
            <h3>Atividades do dia {date}</h3>
            <div className='table-activities'>

                <table className="table  table-primary text-primary table-hover">
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
                                return <tr key={i} onClick={() => setActivity(activity)} data-bs-toggle="modal" data-bs-target="#exampleModal">
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

            <Modal activity={infoActivity}></Modal>
        </div>
    )
}

function Modal(props) {
    console.log('modal')
    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Descrição da Atividade</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='m-2'>
                            <label htmlFor="" className="form-label">Atividade</label>
                            <input type="text" value={props.activity.activity} className="form-control" />
                        </div>
                        <div className="d-flex">
                            <div className='m-2'>
                                <label htmlFor="" className="form-label">Técnico</label>
                                <input type="text" value={props.activity.tec} className="form-control" />
                            </div>

                            <div className='m-2'>
                                <label htmlFor="" className="form-label">Frequência</label>
                                <input type="text" value={props.activity.freq} className="form-control" />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className='m-2'>
                                <label htmlFor="" className="form-label">Mês/Ano</label>
                                <input type="text" value={props.activity.tec} className="form-control" />
                            </div>

                            <div className='m-2'>
                                <label htmlFor="" className="form-label">Paradas</label>
                                <input type="text" value={props.activity.freq} className="form-control" />
                            </div>
                        </div>
                        <div className="m-2">
                            <label htmlFor="" className="form-label">Realizada em:</label>
                        </div>
                        <div className="d-flex m-2 border p-4 flex-wrap">
                            {
                                 Array(30).fill(0).map((v, i) => {
                                     return <div className="form-check m-1" key={i}>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" for="flexCheckDefault">
                                            {i+1}
                                    </label>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivitiesList