import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import './ActivitiesList.css'


const ActivitiesList = (props) => {
    const { date } = useParams()

    
    const [activity, setActivity] = useState({})
    const [filterValue, setFilterValue] = useState('0')
    const [subFilter, setSubFilter] = useState('')
    const [filterValues, setFilterValues] = useState([])
    const [activities, setActivities] = useState([])
    const [auxActivities, setAuxActivities] = useState(activities)
    const [loading, setLoading] = useState(false)
    const [machines, setMachines] = useState([]);
    const [machine, setMachine] = useState();
    


    useEffect(  () => {
        async function getActivities (){
            const auxDate = date.split('-');
            
            const month =parseInt(auxDate[1])
    
            setLoading(true)
             await db.collection('scheduled_activities').doc(auxDate[0]).collection(month.toString()).doc(auxDate[2]).collection('activities').get().then( async result => {
                  await db.collection('activities').get().then( async snap => { 
                      let activitiesAux = snap.docs.filter(  doc => 
                        result.docs.map( scheduledActvities => 
                            scheduledActvities.data().id_activity).includes(doc.id)).map( doc => 
                                { return {...doc.data(), "id": doc.id}})
                                
                                

                                activitiesAux = activitiesAux.map( activity => {return {...activity, activityScheduled: result.docs.map( scheduledActvities => 
                                    {return {...scheduledActvities.data(), activityScheduledId: scheduledActvities.id }}).find( scheduled => scheduled.id_activity === activity.id)}})
                                
                                setActivities(activitiesAux);
                                setAuxActivities(activitiesAux);

                       await db.collection('machines').get().then( snapMachine =>
                        {
                            setMachines(snapMachine.docs.filter( machine => 
                           {  return activitiesAux.filter( activity =>{  return activity.machine === machine.id}).length > 0}).map(doc => 
                                { return {...doc.data(), "id": doc.id}}))
                        });
                               
                    });
                   
             });
      
            setLoading(false)
                      
        }
        
        getActivities()
              
    }, []);


    const changeMainFilter = (event) => {
        const value = event.target.value;

        setFilterValue(value)

        switch (value) {
            case '1':
                setFilterValues(machines.map( machine => machine.description))
                break;
            case '2':
                setFilterValues(['MECÂNICA', 'LUBRIFICAÇÃO', 'ELÉTRICA'])
                break;
            // case '3':
            //     setFilterValues(['Á. Sanitária', 'S. Rajado', 'Desinfetante', 'S. Glicerinado', 'Multiuso', 'Detergente'])
            //     break;
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
                setAuxActivities(activities.filter(activity => machines.find( machine => machine.id === activity.machine).description === value ))
                break;
            case '2':
                
                setAuxActivities(activities.filter(activity => activity.type === value))
                break;
            case '0':
                setAuxActivities(activities);
                break;
            default:
                break;
        }
    }


    return (
        <div className='activities'>
            <div className='header-acitvities d-flex justify-content-between '>
              
                <h3>{date}</h3>

                <div className='filter-activities col-5 d-flex align-content-center m-2'>
                    <label className='form-label m-2 '>
                        <i class="fas fa-filter"></i>
                    </label>

                    <select class="form-select mx-2" aria-label="Default select example" value={filterValue} onChange={changeMainFilter}>
                        <option selected value="0">Todas Atividades</option>
                        <option value="1">Máquina</option>
                        <option value="2">Tipo Manutenção</option>
                        
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

                <div>
                    <button className='btn btn-primary'>GERAR FORMULÁRIO</button>
                </div>
            </div>

            <div className='table-activities'>

                <table className="table text-primary  table-hover">
                    <thead className='header table-primary text-primary' >
                        <tr>
                            
                            <th scope="col" className="header">Atividade</th>
                            <th scope="col" className="header">Máquina</th>
                            <th scope="col" className="header">Status</th>
                            
                        </tr>
                    </thead>
                   { loading ? <div><h6>Carregando...</h6></div> : <tbody>
                        {
                            auxActivities.map((activity, i) => {
                                return <tr key={i} onClick={() => {setActivity(activity); setMachine(machines.find( machine => machine.id === activity.machine))}} data-bs-toggle="modal" data-bs-target="#addActivity">
                                    
                                    <td>{activity.description}</td>
                                    <td>{machines.find( machine => machine.id === activity.machine).description}</td>
                                    <td>{activity.activityScheduled.status ? <div className='d-flex'><div  className=" bg-success rounded-circle mx-2" style={{height: '20px', width: '20px'}}></div>
                                <label htmlFor="" className="">Finalizada</label></div> : <div className='d-flex'><div  className=" bg-danger rounded-circle mx-2" style={{height: '20px', width: '20px'}}></div>
                                <label htmlFor="" className="">Pendente</label></div> }</td>
                                    
                                    
                                </tr>
                            })
                        }

                    </tbody>}
                </table>

            </div>

            {machine && activity ? <ActivityModal activity={activity}  machine={machine} year={date.split('-')[0]} month={parseInt(date.split('-')[1]).toString()} day={date.split('-')[2]}></ActivityModal> : <div></div>}
        </div>
    )
}

function ActivityModal(props) {

    const endActivity = async () =>{
        // console.log(props.year)
        // console.log(props.month)
        // console.log(props.day)
        // console.log(props.activity.id)
       await  db.collection('scheduled_activities').doc(props.year).collection(props.month).doc(props.day).collection('activities').doc(props.activity.activityScheduled.activityScheduledId).update({status: 1});
       window.location.reload();
    }
      
    return (
        <div className="modal fade" id="addActivity" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold " id="exampleModalLabel">Descrição da Atividade</h5>
                       
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                       { !props.activity.activityScheduled.status ? <div className="d-flex justify-content-center ">
                                <label htmlFor="" className="form-label fw-bold fs-6">Status:</label>
                                <div  className=" bg-danger rounded-circle mx-2" style={{height: '20px', width: '20px'}}></div>
                                <label htmlFor="" className="">Pendente</label>
                        </div> :  <div className="d-flex justify-content-center ">
                                <label htmlFor="" className="form-label fw-bold fs-6">Status:</label>
                                <div  className=" bg-success rounded-circle mx-2" style={{height: '20px', width: '20px'}}></div>
                                <label htmlFor="" className="">Finalizada</label>
                        </div>}
                        <div className='m-2'>
                            <label htmlFor="" className="form-label fw-bold">Atividade</label>
                            <input type="text"  className="form-control" required value ={props.activity.description} disabled/>
                        </div>
                        <div >
                            <div className='m-2 '>
                                <label htmlFor="" className="form-label fw-bold">Máquina - Linha - Setor</label>
                              
                                 <input type="text"  className="form-control" required value ={props.machine.description+' - '+ props.machine.product +' - '+ props.machine.sector} disabled/>
                               
                            </div>
                           
                        </div>
                        <div className="d-flex m-2 ">
                            <div className="col-6">
                                <label htmlFor="" className="form-label fw-bold">Tipo de Manutenção</label>
                                <input type="text"  className="form-control" required value ={props.activity.type} disabled/>
                            </div>
                            <div className="mx-1" >
                                <label htmlFor="" className="form-label fw-bold">Técnico</label>
                                <input type="text"  className="form-control"  required value={props.activity.tech} disabled />
                            </div>
                           
                        </div>
                        <div className="d-flex m-2">
                            <div className='col-6'>
                                <div className=''>
                                    <label htmlFor="" className="form-label col-4 fw-bold">Frequência</label>
                                    <input type="number"  className="form-control" value={parseInt(props.activity.frequency)}  />
                                </div>
                                
                            </div>
                            {
                                props.activity.type === 'LUBRIFICAÇÃO' ?  <div className="mx-1 " >
                                <label htmlFor="" className="form-label fw-bold">Lubrificante</label>
                                <input type="text"  className="form-control" value={props.activity.lubricant} disabled/>
                            </div>: <div></div>
                            }
                        </div>
                               

                    </div>
                    <div className="modal-footer d-flex justify-content-start">
                    <div className="d-flex align-items-center">
                            
                            {/* <div className='d-flex justify-content-center'> */}
                            <label htmlFor="" className="form-label fw-bold fs-6 m-2">Ação: </label>
                            {/* </div> */}
                            <select className="form-select" aria-label="Default select example" >
                                    <option selected value="0">Gerar Formulário</option>
                                    <option value="1">Marcar como concluída</option>
                                </select>
                        </div>
                        <button type="button" className="btn btn-primary"   id="concludeButton" onClick={() => endActivity()}>CONCLUIR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ActivitiesList