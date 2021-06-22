import React, {useState} from 'react';

const RegisterGeneral = (props) => {
    const [modalType, setType] = useState('machine');
    const [machines, setMachines] = useState(['SOPRADORA', 'ENVASADORA', 'CHILER']);
    const [activities, setActivities] = useState(['FIXAÇÃO DAS VARETAS: VERIFICAR O APERTO DA PORCA E CONTRA PORCA.','INSPECIONAR CORRENTE INFERIOR'])
    const [anomalies, setAnomalies] = useState(['CORREIA DA TRAÇÃO DA RÉGUA: VERIFICAR A TENSÃO DA CORREIA A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.', 'ALINHAMENTO RÉGUA/ PRENSA: COM A PRENSA FECHADA VERIFICAR A CENTRALIZAÇÃO DA RÉGUA NO MOLDE.'])

    const addMachine = (machineDesc) =>{

        console.log(machineDesc)
        setMachines([machineDesc, ...machines])
        console.log('MACHINES:', machines)
    }

    const addActivity = (activityDesc) => {
        setActivities([activityDesc, ...activities])

    }

    const addAnomally = (anomallyDesc) => {
        setAnomalies([anomallyDesc, ...anomalies])
    }



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
                                                <td>{machine}</td>
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
                                                <td>{activity}</td>
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
                        <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#addAnomally" onClick={() => setType('Atividade')}><i class="fas fa-plus-circle"></i> Nova Atividade</button>
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
                                                <td>{anomally}</td>
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
                <Modal addMachine={addMachine} addActivity={addActivity} addAnomally={addAnomally} type={modalType}>

                </Modal>
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
                                    if(desc !== ''){
                                        props.addMachine(desc)
                                        clearModal()
                                        
                                     }
                                    break;
                                case 'Atividade':
                                    if(desc !== ''){
                                        props.addActivity(desc)
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
        var bottonSave = document.getElementById('saveButton');
                                        
        bottonSave.setAttribute('data-bs-dismiss', 'modal')
        bottonSave.click()
        bottonSave.removeAttribute('data-bs-dismiss')
    }
}

export default RegisterGeneral

// {/* <div className='card'>
//                   {/* <div className="card-header">
//                       Novos cadastros
//                   </div> */}
//                 <div className="card-body">
//                     <h5 className='card-title'>O que você deseja cadastrar?</h5>
//                 <div>
//                     <button className='btn btn-primary'><i class="fas fa-plus-circle"></i> Nova Máquina</button>
//                     <button className='btn btn-primary m-2'><i class="fas fa-plus-circle"></i> Nova Atividade</button>
//                     <button className='btn btn-primary'><i class="fas fa-plus-circle"></i> Nova Anomalia</button>
//                 </div>
//                 </div>
//               </div> */}