
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { db } from '../../firebase'
import './KeepingForm.css'

const KeepingForm = () => {
    const {activity_id} = useParams();

    
    const [current, setCurrent] = useState(0)
    const [disableBackButton, setDisableBackButton] = useState(false)
    const [isLastPage, setIsLastPage] = useState(false)
    const [activities, setActivities]= useState([])
    const [machines, setMachines] = useState([])
    const [activitiesStatus, setActivitiesStatus] = useState([]);
    const [loading, setLoading] = useState(false);
    



    useEffect(() => {

        async function getForms(){

            await db.collection('activities_forms').doc(activity_id).get().then( async snapForm => {
                const forms = snapForm.data();
                // setReferenceForActivities(forms.list);
                await db.collection('activities').get().then( async snapActivities => {
                    let auxActivities =  snapActivities.docs.filter(  doc => 
                        forms.list.map( formActivity => 
                            formActivity.id_activity).includes(doc.id)).map( doc => 
                                { return {...doc.data(), "id": doc.id}})
                                
                                setActivities(auxActivities);
                                console.log(auxActivities)
                        
                            await db.collection('machines').get().then( snapMachine =>
                            {
                                setMachines(snapMachine.docs.filter( machine => 
                                {  return auxActivities.filter( activity =>{  return activity.machine === machine.id}).length > 0}).map(doc => 
                                    { return {...doc.data(), "id": doc.id}}))
                            });
                })

               
            })
        }
        if(activities.length === 0){
            getForms()
        }

        if (current < 4) {
            setDisableBackButton(true)
        } else {
            setDisableBackButton(false)
        }

        if (current >= (activities.length - 4)) {
            setIsLastPage(true)
        } else {
            setIsLastPage(false)
        }

        // if(current >)
    }, [current]);


    // const addActivity = (activityDesc) =>{
    //     const activity = { activity: activityDesc, item: activities.length+1, status: 3};

    //     activities.push(activity);
    // }

    function onChangeValue(event) {
        console.log(event.target.name)

        if(activitiesStatus.length > 0){
            const activityStatus = activitiesStatus.find( status => status.id === event.target.name);
            if( activityStatus !== undefined){
                setActivitiesStatus([...activitiesStatus.filter( status => status.id !== event.target.name), {id: event.target.name, status: event.target.value}])
            }else{
                setActivitiesStatus([...activitiesStatus, {id: event.target.name, status: event.target.value}])
            }
        }else{
            setActivitiesStatus([{id: event.target.name, status: event.target.value}])
        }
        
      }

      const sendForm = async () =>{

        setLoading(true)

        const form = await db.collection('activities_forms').doc(activity_id).get();
        const date = form.data().date.split('-');
        const list = form.data().list;

        const auxList = list.filter( activity_schedule => activitiesStatus.filter( activityStt => activityStt.status === "OK").map(activitiesId => activitiesId.id).includes(activity_schedule.id_activity))
          console.log(auxList)
          
          for(let activity of auxList){
            await db.collection('scheduled_activities').doc(date[0]).collection(parseInt(date[1]).toString()).doc(parseInt(date[2]).toString()).collection('activities').doc(activity.activityScheduledId).update({status: 1})
          }

          await db.collection('activities_forms').doc(activity_id).update({finalized: true});

        
        setLoading(false);
        


      }
    return (
        <div className='keeping-form'>


            <div className="container d-flex flex-wrap">

                <div className='card m-2 col-10 d-flex flex-row'>
                    <div className='p-2 bg-primary'>

                    </div>
                    <h1>Manutenção preventiva </h1>
                </div>

                <div className='card m-2 col-10'>
                    <div className="card-body">
                        {/* <div className='d-flex justify-content-between m-2' >
                            <div className='m-2 d-flex align-items-center'>
                                <label htmlFor="" className='label-form me-1'>Linha: </label>
                                <select name="" id="" className='form-select'>
                                    <option value="">Desinfetante</option>
                                    <option value="">Detergente</option>
                                </select>
                            </div>
                            <div className='m-2 d-flex align-items-center '>
                                <label htmlFor="" className='label-form me-1'>Setor:</label>
                                <select name="" id="" className='form-select'>
                                    <option value="">Sabão</option>
                                    <option value="">Líquido</option>
                                </select>
                            </div>
                            <div className='m-2 d-flex align-items-center'>
                                <label htmlFor="" className='label-form me-1'>Máquina:</label>
                                <select name="" id="" className='form-select'>
                                    <option value="">SOPRADORA</option>
                                    <option value="">ENVASADORA</option>
                                </select>
                            </div>
                        </div> */}
                        {/* tam = 6 => i > current e i <= current + 4 */}
                        <h3>Atividades</h3>
                        {
                            activities.filter((activity, i )=> i+1 > current && i+1<= (current+4)).map((activity, i) => {

                                return (
                                  <div className='my-1' key={activity.id} id={activity.id}>
                                      {machines && machines.length > 0 ? <label htmlFor="" className="align-self-start bg-primary text-white px-1">{machines.find( machine => machine.id === activity.machine).description+" - "+machines.find( machine => machine.id === activity.machine).product}</label> : <div></div>}
                                <div className='card d-flex flex-row align-items-center justify-content-between ' >
                                    
                                    {/* <div className='item-number'>
                                        
                                        <h5>{i+1}</h5>
                                    </div> */}
                                    
                                    <div className='d-flex justify-content-between w-100 align-items-center'>
                                    <div className=' p-2'>
                                        <h6>
                                            {activity.description}
                                        </h6>
                                    </div >
                                    <div className='p-2 btn-group d-flex flex-column'  onChange= {onChangeValue }  id={activity.id} >
                                        <div className="form-check" id={activity.id}>
                                            <input className="form-check-input" type="radio" name={activity.id}  value="OK" />
                                            <label className="form-check-label" htmlFor={activity.id}>OK</label>
                                        </div>
                                        <div className="form-check" id={activity.id}>
                                            <input className="form-check-input" type="radio" name={activity.id}  value="NÃO" />
                                            <label className="form-check-label" htmlFor={activity.id}>
                                                Não Ok</label>
                                        </div>
                                        <div className="form-check" id={activity.id}>
                                            <input className="form-check-input" type="radio" name={activity.id}  value="..." defaultChecked />
                                            <label className="form-check-label" htmlFor={activity.id}>
                                                N SE APLICA
                                        </label>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                  </div>  
                                );
                                
                            })
                        }
                        {/* {
                            current >= (activities.length - 4) ? <button className='btn btn-primary m-2 ' data-bs-toggle="modal" data-bs-target="#addAnomally">
                                <i className="fas fa-plus-circle "></i> Adicionar Anomalia
                            </button> : <div></div>
                        } */}


                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-primary m-1' onClick={() => {
                                if (current > 3) {
                                    setCurrent(current - 4)
                                }
                            }} disabled={disableBackButton}>VOLTAR</button>
                            { current < (activities.length - 4) ? <button className='btn btn-primary m-1' onClick={() => {
                                
                                    setCurrent(current + 4)
                                
                            }}> AVANÇAR</button> : <button className='btn btn-primary m-1' onClick={() => {
                              
                                    sendForm()
                                
                            }} data-bs-toggle="modal" data-bs-target="#modalLoading" data-backdrop="static" data-keyboard="false"> ENVIAR</button>}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Modal addActivity={addActivity}>

            </Modal> */}
             <ModalLoading loading={loading}></ModalLoading>
        </div>
    )
}

function Modal(props) {
    const [activityDesc, setActivityDesc] = useState('')

    return (
        <div className="modal fade" id="addAnomally" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Nova Atividade</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}} value={activityDesc} onChange={ (e) => setActivityDesc(e.target.value)}></textarea>
                            <label for="floatingTextarea2">Descrição</label>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={ props.addActivity(activityDesc)}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ModalLoading(props) {
    const history = useHistory();

    function backToChooseForm(){
        history.goBack()
    }

    return (
        <div className="modal fade" id="modalLoading" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Formulário de atividades</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                   {props.loading ?  <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>: <div><h6>Formulário enviado com sucesso!</h6></div> }

                    </div>
                    {props.loading ? <div></div> : <div className="modal-footer">
                        
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => backToChooseForm()} >OK</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default KeepingForm