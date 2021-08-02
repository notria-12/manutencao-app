import React, {useEffect, useState} from 'react';
import {db} from '../../firebase'

const RegisterGeneral = (props) => {
    const [modalType, setType] = useState();
    const [modalActivityType, setModalActivityType] = useState();
    const [machines, setMachines] = useState([]);
    const [activities, setActivities] = useState([])
    const [machine, setMachine] = useState();
    const [activity, setActivity] = useState();
    

  

    const removeMachine = async(idMachine) => {
        await db.collection('machines').doc(idMachine).delete()
    }

    const removeActivity = async(idActivity) => {
        await db.collection('activities').doc(idActivity).delete()
    }
       

    useEffect( () => {
       const unsubscribeActivity = db.collection('activities').onSnapshot(snapshot => setActivities(snapshot.docs.map(doc => { return {...doc.data(), "id": doc.id}})))
    const unsubscribeMachine = db.collection('machines').onSnapshot(snapshot => setMachines(snapshot.docs.map(doc => { return {...doc.data(), "id": doc.id}})));

       return () => {
           unsubscribeActivity()
           unsubscribeMachine()
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
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <table className='table table-primary'>
                            <thead className='header'>
                                <th>Descrição</th>
                                <th>Linha de Produção</th>
                                <th>Setor</th>
                                <th>Ação</th>
                            </thead>
                            <tbody>
                                {
                                    machines.map((machine, i) =>{
                                        return(
                                            <tr key={i}>
                                                <td>{machine.description}</td>
                                                <td>{machine.product}</td>
                                                <td>{machine.sector}</td>
                                                <td>
                                                    <div>
                                                        <button className='btn p-1' onClick={() => removeMachine(machine.id)}><i className="far fa-trash-alt"></i></button>
                                                        <button className='btn p-1' data-bs-toggle="modal" data-bs-target="#addAnomally" onClick={() => {setMachine(machine); setType(1); }}><i className="far fa-edit"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#addAnomally" onClick={() => { setMachine(undefined); setType(0); }}><i className="fas fa-plus-circle"></i> Nova Máquina</button>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <table className='table table-primary'>
                            <thead className='header'>
                                <th>Descrição</th>
                                <th>Máquina</th>
                                <th>Setor</th>

                                {/* <th>Linha de Produção</th> */}
                                
                                <th>Ação</th>
                            </thead>
                            <tbody>
                                {
                                    activities.map((activity, i) =>{
                                        return(
                                            <tr key={i}>
                                                <td>{activity.description}</td>
                                                {/* <td>{activity.description}</td> */}
                                                {machines.length > 0 ? <td>{machines.find( machine => machine.id === activity.machine ).description}</td> : <td>TESTE</td>}
                                                {machines.length > 0 ? <td>{machines.find( machine => machine.id === activity.machine ).sector}</td> : <td>TESTE</td>}
                                                
                                                <td>
                                                    <div>
                                                        <button className='btn p-1'  onClick={() => removeActivity(activity.id)}><i className="far fa-trash-alt"></i></button>
                                                        <button className='btn p-1' data-bs-toggle="modal" data-bs-target="#addActivity" onClick={() => {setActivity(activity); setModalActivityType(1)}}><i className="far fa-edit"></i></button>
                                                    </div>
                                                </td>
                                                
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#addActivity" onClick={() => {setActivity(undefined); setModalActivityType(0)}}><i class="fas fa-plus-circle"></i> Nova Atividade</button>
                    </div>
                   
                </div>
                
                <Modal  type={modalType} machine={machine}>
                </Modal>
                
                <ActivityModal machines={machines} activity={activity} type={modalActivityType}>
                </ActivityModal>
        </div>
    );
}

function Modal(props) {
    const [desc, setDesc] = useState('');
    const [product, setProduct] = useState('Product');
    const [nSerie, setNSerie] = useState('');
    const [sector, setSector]= useState('');
 

    useEffect(() =>{
        if(props.machine){
            setDesc(props.machine.description);
            setProduct(props.machine.product);
            setNSerie(props.machine.n_serie);
            setSector(props.machine.sector);
        }else{
            setDesc('');
            setProduct('');
            setNSerie('');
            setSector('');
        }
    }, [props.machine])



    const editMachine = async () => {
        await db.collection('machines').doc(props.machine.id).update({"description":desc, "product": product, 'n_serie': nSerie, 'sector': sector});
    }

    const addMachine = async () => {
        await db.collection('machines').doc().set({"description": desc, "product": product, 'n_serie': nSerie, 'sector': sector})

    }
   
    return (
        
        <div className="modal fade" id="addAnomally" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form className="modal-dialog" key={props.machine}>
                <div className="modal-content" >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.type === 0 ? 'Nova Máquina': 'Edição de Máquina'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className="d-flex my-2 justify-content-between ">
                            <div className='col-5' >
                                <label htmlFor="" className="form-label">Linha de Produção</label>
                                <input type="text"  className="form-control" value={product} onChange={(e) => {setProduct(e.target.value); }} required />
                            </div>
                            
                            <div className=" mx-1 col-3" >
                                <label htmlFor="" className="form-label " >Setor</label>
                                <input type="text"  className="form-control" value={sector} onChange={(e) => {setSector(e.target.value)}} required/>
                            </div>                          

                            <div >
                                <label htmlFor="" className="form-label " >N° Série</label>
                                <input type="text"  className="form-control" value={  nSerie} onChange={(e) => {setNSerie(e.target.value); }} required/>
                            </div> 

                    </div >
                    
                    
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}} value={desc} onChange={(e) => {setDesc(e.target.value); }}></textarea>
                            <label for="floatingTextarea2">Descrição</label>
                        </div>
                       

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" id='saveButton' onClick={() =>{
                            
                            switch (props.type) {
                                case 0:
                                    if(desc !== '') {
                                        addMachine()
                                        clearModal()
                                        
                                     }
                                    break;
                                case 1:
                                    if(desc !== '') {
                                        editMachine()
                                        clearModal()
                                        
                                     }

                                    break;
                             
                            
                                default:
                                    break;
                            }

                             }}>Salvar</button>
                    </div>
                </div>
            </form>
        </div>
    )

    function clearModal(){
        setDesc('');
        setProduct('');
        setNSerie('');
        setSector('');
       
    }
}

function ActivityModal(props) {
    const [activityName, setActivityName] = useState('');
    const [machine, setMachine] = useState('');
    const [freq, setFreq] = useState('');
    const [duration, setDuration] = useState();
    const [lubricant, setLubricant] = useState('');
  
    const [value, setValue] = useState();

    function clearModal(){
        setActivityName('')
        setMachine('')
        setFreq('')
        setDuration('')
        setValue('')
        setLubricant('')
        
    }


    useEffect(() => {
        if(props.activity){
            setActivityName(props.activity.description)
        setMachine(props.activity.machine)
        setFreq(parseInt(props.activity.frequency))
        setDuration(props.activity.duration)
        setValue(props.activity.type)
        }else{
            clearModal();
        }

    }, [props.activity])


    async function handleSave(){
        const activityRef = db.collection('activities');
        
        
        if( activityName !== "" &&  machine !== "" && freq !== "" ){

            let activity= {description: activityName, machine: machine, frequency: freq, duration: duration, createdAt: Date.now(), type: value, lubricant: lubricant}
    
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
                            <input type="text"  className="form-control" required value ={activityName} onChange={ (e) => {setActivityName(e.target.value); } }/>
                        </div>
                        <div >
                            <div className='m-2 '>
                                <label htmlFor="" className="form-label">Máquina - Linha - Setor</label>
                                <select className="form-select" aria-label="Default select example"  value={machine} onChange={ (e) => {setMachine(e.target.value)}} >
                                    <option selected value="">Selecione uma máquina</option>
                                    {props.machines.map((machine, i) => {
                                        return (
                                            <option value={machine.id}>{machine.description+' - '+ machine.product +' - '+ machine.sector}</option>
                                        )
                                        
                                    })}
                                  
                                </select>
                               
                            </div>
                           
                          
                            {/* <div className='m-2 d-flex col-6'>
                                <div className='mx-1'>
                                    <label htmlFor="" className="form-label col-4">Frequência</label>
                                    <input type="number"  className="form-control" ref={freqRef} required/>
                                </div>
                                <div className='mx-1'>
                                    <label htmlFor="" className="form-label">Paradas</label>
                                    <input type="number"  className="form-control" ref={stopsRef} required/>
                                </div>
                            </div> */}

                        </div>
                        <div className="d-flex m-2 ">
                            <div className="col-6">
                                <label htmlFor="" className="form-label">Tipo de Manutenção</label>
                                <select className="form-select" aria-label="Default select example" value={value} onChange={(e) => setValue(e.target.value)}>
                                    <option selected value="">Selecione o tipo</option>
                                    <option value="MECÂNICA">MECÂNICA</option>
                                    <option value="LUBRIFICAÇÃO">LUBRIFICAÇÃO</option>
                                    <option value="ElÉTRICA">ElÉTRICA</option>
                                </select>
                            </div>
                            <div className="mx-1" >
                                <label htmlFor="" className="form-label">Tempo Estimado(min)</label>
                                <input type="number"  className="form-control"  required value={parseInt(duration)} onChange={(e) => {setDuration(e.target.value)}}/>
                            </div>

                            
                        </div>
                        <div className="d-flex m-2">
                            <div className='col-6'>
                                <div className=''>
                                    <label htmlFor="" className="form-label col-4">Frequência</label>
                                    <input type="number"  className="form-control" value={parseInt(freq)} onChange={(e) => {setFreq(e.target.value)}} required/>
                                </div>
                                
                            </div>
                            {
                                value === 'LUBRIFICAÇÃO' ?  <div className="mx-1 " >
                                <label htmlFor="" className="form-label">Lubrificante</label>
                                <input type="text"  className="form-control" value={lubricant} onChange={(e) => {setLubricant(e.target.value)}} required/>
                            </div>: <div></div>
                            }
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
