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
            tec: "Fulano ",
            product: "Desinfetante",
        },
        {
            id: 1,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'Chiler',
            tec: "Beltrano",
            product: "Á. Sanitária",
        },
        {
            id: 2,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'CHILER',
            tec: "Beltrano",
            product: "Desinfetante",
        },
        {
            id: 3,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano ",
            product: "S. Glicerinado",
        },
        {
            id: 4,
            activity: 'INSPECIONAR ROSCA SEM FIM',
            freq: 15,
            machine: 'ROTULADORA',
            tec: "CICLANO ",
            product: "S. Rajado",
        },
        {
            id: 5,
            activity: 'INSPECIONAR AJUSTE DAS ESTRELAS',
            freq: 14,
            machine: 'ENVASADORA',
            tec: "Fulano ",
            product: "Á. Sanitária",
        },
        {
            id: 6,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano ",
            product: "Multiuso",
        },
        {
            id: 7,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'Chiler',
            tec: "Beltrano",
            product: "Detergente",
        },
        {
            id: 8,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'CHILER',
            tec: "Beltrano",
            product: "Á. Sanitária",
        },
        {
            id: 0,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano ",
            product: "S. Glicerinado",
        },
        {
            id: 1,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'Chiler',
            tec: "Beltrano",
            product: "Detergente",
        },
        {
            id: 2,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'CHILER',
            tec: "Beltrano",
            product: "Multiuso",
        },
        {
            id: 3,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano ",
            product: "S. Rajado",
        },
        {
            id: 4,
            activity: 'INSPECIONAR ROSCA SEM FIM',
            product: "Á. Sanitária",
            freq: 15,
            machine: 'ROTULADORA',
            tec: "CICLANO "
        },
        {
            id: 5,
            activity: 'INSPECIONAR AJUSTE DAS ESTRELAS',
            freq: 14,
            machine: 'ENVASADORA',
            tec: "Fulano ",
            product: "Desinfetante",
        },
        {
            id: 6,
            activity: 'INSPECIONAR CORRENTE INFERIOR',
            freq: 15,
            machine: 'SOPRADORA',
            tec: "Fulano ",
            product: "S.Glicerinado",
        },
        {
            id: 7,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'Chiler',
            tec: "Beltrano",
            product: "Detergente",
        },
        {
            id: 8,
            activity: 'FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.',
            freq: 7,
            machine: 'CHILER',
            tec: "Beltrano",
            product: "Desinfetante",
        },


    ]

    const [infoActivity, setActivity] = useState({})
    const [filterValue, setFilterValue] = useState('0')
    const [subFilter, setSubFilter] = useState('')
    const [filterValues, setFilterValues] = useState([])
    const [auxActivities, setAuxActivities] = useState(activities)

    const changeMainFilter = (event) => {
        const value = event.target.value;

        setFilterValue(value)

        switch (value) {
            case '1':
                setFilterValues(['SOPRADORA', 'CHILER', 'ROTULADORA', 'ENVASADORA'])
                break;
            case '2':
                setFilterValues(['FULANO', 'CICLANO', 'BELTRANO'])
                break;
            case '3':
                setFilterValues(['Á. Sanitária', 'S. Rajado', 'Desinfetante', 'S. Glicerinado', 'Multiuso', 'Detergente'])
                break;
            default:
                setAuxActivities(activities)
                break;
        }

    }

    const changeSubFilter = (event) => {
        const value = event.target.value;

        setSubFilter(value);


        switch (filterValue) {
            case '1':
                setAuxActivities(activities.filter(activity => activity.machine.toUpperCase() === value))
                break;
            case '2':
                console.log(value)
                setAuxActivities(activities.filter(activity => activity.tec.toUpperCase() === value))
                break;
            case '3':
                setAuxActivities(activities.filter(activity => activity.product === value))
                break;
            default:
                break;
        }





    }





    return (
        <div className='activities'>
            <div className='header-acitvities d-flex justify-content-between '>
                <button className='btn btn-primary m-2'>
                <i class="fas fa-plus-circle"></i> Adicionar Atividade
                </button>
                <h3>{date}</h3>

                <div className='filter-activities col-5 d-flex align-content-center m-2'>
                    <label className='form-label m-2 '>
                        <i class="fas fa-filter"></i>
                    </label>

                    <select class="form-select mx-2" aria-label="Default select example" value={filterValue} onChange={changeMainFilter}>
                        <option selected value="0">Selecione um filtro...</option>
                        <option value="1">Máquina</option>
                        <option value="2">Técnico</option>
                        <option value="3">Produto</option>
                    </select>

                    {
                        filterValue !== '0' ?
                            <select class="form-select" aria-label="Default select example" value={subFilter} onChange={changeSubFilter}>
                                {/* <option selected value="0">Selecione um filtro...</option> */}
                                {
                                    filterValues.map((filter, i) => {
                                        return <option key={i}>{filter}</option>
                                    })
                                }
                            </select> : <div></div>
                    }


                </div>
            </div>

            <div className='table-activities'>

                <table className="table  table-primary text-primary table-hover">
                    <thead className='header' >
                        <tr>
                            <th scope="col" className="header">Produto</th>
                            <th scope="col" className="header">Atividade</th>
                            <th scope="col" className="header">Técnico</th>
                            <th scope="col" className="header">Máquina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            auxActivities.map((activity, i) => {
                                return <tr key={i} onClick={() => setActivity(activity)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <td>{activity.product}</td>
                                    <td>{activity.activity}</td>
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
    // console.log('modal')
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
                        <div className="d-flex  ">
                            <div className='m-2 '>
                                <label htmlFor="" className="form-label">Produto</label>
                                <input type="text" value={props.activity.product} className="form-control" />
                            </div>
                            <div className='m-2 col-6'>
                                <label htmlFor="" className="form-label">Mês/Ano</label>
                                <input type="text" value={props.activity.tec} className="form-control" />
                            </div>

                        </div>
                        <div className="d-flex">
                            <div className='m-2'>
                                <label htmlFor="" className="form-label">Técnico</label>
                                <input type="text" value={props.activity.tec} className="form-control" />
                            </div>

                            <div className='m-2 d-flex col-6'>
                                <div className='mx-1'>
                                    <label htmlFor="" className="form-label col-4">Frequência</label>
                                    <input type="number" value={props.activity.freq} className="form-control" />
                                </div>
                                <div className='mx-1'>
                                    <label htmlFor="" className="form-label">Paradas</label>
                                    <input type="number" value={props.activity.freq} className="form-control" />
                                </div>
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
                                            {i + 1}
                                        </label>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivitiesList