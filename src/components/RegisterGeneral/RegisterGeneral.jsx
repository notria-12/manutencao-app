import React, {useEffect, useRef, useState} from 'react';
import {db} from '../../firebase'

const RegisterGeneral = (props) => {
    const [modalType, setType] = useState('machine');
    const [machines, setMachines] = useState([]);
    const [activities, setActivities] = useState([])
    const [anomalies, setAnomalies] = useState([])

    const addMachine = async (machineDesc) => {
        await db.collection('machines').doc().set({"description": machineDesc})

    }

    

    const addAnomally = async (anomallyDesc) => {
        await db.collection('anomalies').doc().set({"description": anomallyDesc})
    }

   

    useEffect( () => {
       const unsubscribeActivity = db.collection('activities').onSnapshot(snapshot => setActivities(snapshot.docs.map(doc => doc.data())))
    const unsubscribeMachine = db.collection('machines').onSnapshot(snapshot => setMachines(snapshot.docs.map(doc => doc.data())));
    const unsubscribeAomally = db.collection('anomalies').onSnapshot(snapshot => setAnomalies(snapshot.docs.map(doc => doc.data())));

       return () => {
           unsubscribeActivity()
           unsubscribeMachine()
           unsubscribeAomally()
       }
        
    },[])



    return (
        <div className='register-page'>
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Máquinas</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Atividades</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Anomalias</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <table className='table table-primary'>
                            <thead className='header'>
                                <th>Descrição</th>
                                <th>Ação</th>
                            </thead>
                            <tbody>
                                {
                                    machines.map((machine, i) =>{
                                        return(
                                            <tr key={i}>
                                                <td>{machine.description}</td>
                                                <td>
                                                    <div>
                                                        <button className='btn p-1'><i className="far fa-trash-alt"></i></button>
                                                        <button className='btn p-1'><i className="far fa-edit"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#addAnomally" onClick={() => setType('Máquina')}><i class="fas fa-plus-circle"></i> Nova Máquina</button>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <table className='table table-primary'>
                            <thead className='header'>
                                <th>Descrição</th>
                                <th>Ação</th>
                            </thead>
                            <tbody>
                                {
                                    activities.map((activity, i) =>{
                                        return(
                                            <tr key={i}>
                                                <td>{activity.description}</td>
                                                <td>
                                                    <div>
                                                        <button className='btn p-1'><i className="far fa-trash-alt"></i></button>
                                                        <button className='btn p-1'><i className="far fa-edit"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#addActivity"><i class="fas fa-plus-circle"></i> Nova Atividade</button>
                    </div>
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <table className='table table-primary'>
                            <thead className='header'>
                                <th>Descrição</th>
                                <th>Ação</th>
                            </thead>
                            <tbody>
                                {
                                    anomalies.map((anomally, i) =>{
                                        return(
                                            <tr key={i}>
                                                <td>{anomally.description}</td>
                                                <td>
                                                    <div>
                                                        <button className='btn p-1'><i className="far fa-trash-alt"></i></button>
                                                        <button className='btn p-1'><i className="far fa-edit"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#addAnomally" onClick={() => setType('Anomalia')}><i class="fas fa-plus-circle"></i> Nova Anomalia</button>
                    </div>
                </div>
                
                <Modal addMachine={addMachine}  addAnomally={addAnomally} type={modalType}>
                </Modal>
                
                <ActivityModal>
                </ActivityModal>
        </div>
    );
}

function Modal(props) {
    const [desc, setDesc] = useState('')

    return (
        <div className="modal fade" id="addAnomally" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Nova {props.type}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                            <label for="floatingTextarea2">Descrição</label>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" id='saveButton' onClick={() =>{
                            
                            switch (props.type) {
                                case 'Máquina':
                                    if(desc !== '') {
                                        props.addMachine(desc)
                                        clearModal()
                                        
                                     }
                                    break;
                  
                                case 'Anomalia':
                                    if(desc !== ''){
                                        props.addAnomally(desc)
                                        clearModal()
                                        
                                     }
                                     break;
                            
                                default:
                                    break;
                            }

                             }}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    )

    function clearModal(){
        setDesc('');
        // var bottonSave = document.getElementById('saveButton');
                                        
        // bottonSave.setAttribute('data-bs-dismiss', 'modal')
        // bottonSave.click()
        // bottonSave.removeAttribute('data-bs-dismiss')
    }
}

function ActivityModal(props) {
    // console.log('modal')
    let activityNameRef = useRef();
    let productRef = useRef();
    let freqRef = useRef();
    let techRef = useRef();
    let stopsRef = useRef();

    function clearModal(){
        activityNameRef.current.value = ''
        
        // var bottonSave = document.getElementById('saveButton2');
                                        
        // bottonSave.setAttribute('data-bs-dismiss', 'modal')
        // bottonSave.click()
        // bottonSave.removeAttribute('data-bs-dismiss')
    }


    async function handleSave(){
        const activityRef = db.collection('activities');
        

        if( activityNameRef.current.value !== "" &&  productRef.current.value !== "" && freqRef.current.value !== "" &&  stopsRef.current.value ){

            let activity= {description: activityNameRef.current.value, product: productRef.current.value, frequency: freqRef.current.value, tech: techRef.current.value, stops: stopsRef.current.value, createdAt: Date.now()}
    
            await activityRef.doc().set(activity);
        }else{
            console.log('Preencha os dados corretamente');
        }
        clearModal();
    }
    
    return (
        <div className="modal fade" id="addActivity" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Descrição da Atividade</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='m-2'>
                            <label htmlFor="" className="form-label">Atividade</label>
                            <input type="text"  className="form-control" ref={activityNameRef} required/>
                        </div>
                        <div className="d-flex  ">
                            <div className='m-2 '>
                                <label htmlFor="" className="form-label">Produto</label>
                                <input type="text"  className="form-control" ref={productRef} required/>
                            </div>
                            <div className='m-2 d-flex col-6'>
                                <div className='mx-1'>
                                    <label htmlFor="" className="form-label col-4">Frequência</label>
                                    <input type="number"  className="form-control" ref={freqRef} required/>
                                </div>
                                <div className='mx-1'>
                                    <label htmlFor="" className="form-label">Paradas</label>
                                    <input type="number"  className="form-control" ref={stopsRef} required/>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex">
                            <div className='m-2'>
                                <label htmlFor="" className="form-label">Técnico</label>
                                <input type="text"  className="form-control" ref={techRef} required/>
                            </div>

                            
                        </div>

                        {/* <div className="m-2">
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
                        </div> */}

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary"  onClick={handleSave} id="saveButton2" >Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterGeneral
