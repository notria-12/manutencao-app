import React, {useEffect, useState} from 'react';
import {db} from '../../firebase'
import './RegisterGeneral.css'

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
        <div >
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Máquinas</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Atividades</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active  " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                      <div className="register-page">
                      <div className="table-activities">
                      <table className='table table-light'>
                            <thead className='header text-primary table-primary'>
                                <tr>
                                    <th scope="col" className="header">Descrição</th>
                                    <th scope="col" className="header">Linha de Produção</th>
                                    <th scope="col" className="header">Setor</th>
                                    <th scope="col" className="header">Ação</th>
                                </tr>
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
                      </div>
                        
                      </div>
                        <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#addAnomally" onClick={() => { setMachine(undefined); setType(0); }}><i className="fas fa-plus-circle"></i> Nova Máquina</button>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        
                        <div className="register-page">
                            <div className="table-activities">
                            <table className='table table-light '>
                                <thead className='header text-primary table-primary '>
                                  <tr>
                                  <th  scope="col" className="header">Descrição</th>
                                    <th  scope="col" className="header">Máquina</th>
                                    <th  scope="col" className="header">Linha</th>

                                    
                                    
                                    <th  scope="col" className="header">Ação</th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                        activities.sort(function (a, b) {
                                            if (a.description > b.description) {
                                              return 1;
                                            }
                                            if (a.description < b.description) {
                                              return -1;
                                            }
                                            // a must be equal to b
                                            return 0;
                                          }).map((activity, i) =>{
                                            return(
                                                <tr key={i}>
                                                    <td>{activity.description}</td>
                                                    {/* <td>{activity.description}</td> */}
                                                    {machines.length > 0 ? <td>{machines.find( machine => machine.id === activity.machine ).description}</td> : <td>TESTE</td>}
                                                    {machines.length > 0 ? <td>{machines.find( machine => machine.id === activity.machine ).product}</td> : <td>TESTE</td>}
                                                    
                                                    <td>
                                                        <div className='d-flex'>
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
                            </div>

                        </div>
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
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
 

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
        setLoading(true)
        await db.collection('machines').doc(props.machine.id).update({"description":desc, "product": product, 'n_serie': nSerie, 'sector': sector});
        setLoading(false)
        setLoaded(true);
    }

    const addMachine = async () => {
        setLoading(true)
        await db.collection('machines').doc().set({"description": desc, "product": product, 'n_serie': nSerie, 'sector': sector})
        setLoading(false)
        setLoaded(true)

    }
   
    return (
        
        <div className="modal fade" id="addAnomally" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form className="modal-dialog" key={props.machine}>
                <div className="modal-content" >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.type === 0 ? 'Nova Máquina': 'Edição de Máquina'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {loading ? <div className='modal-body'><div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Carregando...</span>
                        </div>
                    </div></div> : loaded ? <div className='modal-body'><h6>Maquina {props.type ? 'alterada': 'cadastrada'} com sucesso</h6></div> :<div className="modal-body">
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
                       

                    </div>}
                    { loading ? <div></div> : loaded ? <div className='modal-footer'>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={clearModal}>OK</button>
                    </div> :<div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" id='saveButton' onClick={() =>{
                            
                            switch (props.type) {
                                case 0:
                                    if(desc !== '') {
                                        addMachine()
                                        // clearModal()
                                        
                                     }
                                    break;
                                case 1:
                                    if(desc !== '') {
                                        editMachine()
                                        // clearModal()
                                        
                                     }

                                    break;
                             
                            
                                default:
                                    break;
                            }

                             }}>Salvar</button>
                    </div>}
                </div>
            </form>
        </div>
    )

    function clearModal(){
        setDesc('');
        setProduct('');
        setNSerie('');
        setSector('');
        setLoaded(false);
       
    }
}

function ActivityModal(props) {
    const [activityName, setActivityName] = useState('');
    const [machine, setMachine] = useState('');
    const [freq, setFreq] = useState('');
    const [duration, setDuration] = useState();
    const [lubricant, setLubricant] = useState('');
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
  
    const [value, setValue] = useState();

    function clearModal(){
        setActivityName('')
        setMachine('')
        setFreq('')
        setDuration('')
        setValue('')
        setLubricant('')
        setLoaded(false)
    }


    useEffect(() => {
        if(props.activity){
        setActivityName(props.activity.description)
        setMachine(props.activity.machine)
        setFreq(parseInt(props.activity.frequency))
        setDuration(props.activity.duration)
        setValue(props.activity.type)
        setLubricant(props.activity.lubricant)
        }else{
            clearModal();
        }

    }, [props.activity])


    async function handleSave(){
        const activityRef = db.collection('activities');
        
        setLoading(true);
        if(props.type){
            let activity= {description: activityName, machine: machine, frequency: freq, duration: duration, createdAt: Date.now(), type: value, lubricant: lubricant}
            await activityRef.doc(props.activity.id).update(activity);

        }else{
            if( activityName !== "" &&  machine !== "" && freq !== "" ){

                let activity= {description: activityName, machine: machine, frequency: freq, duration: duration, createdAt: Date.now(), type: value, lubricant: lubricant}
        
                await activityRef.doc().set(activity);
            }else{
                console.log('Preencha os dados corretamente');
            }
        }
        setLoading(false);

        setLoaded(true)
        
    }
    
    return (
        <div className="modal fade" id="addActivity" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Descrição da Atividade</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {loading ? <div className="modal-body"><div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Carregando...</span>
                        </div>
                    </div></div> : loaded ? <div className="modal-body">Atividade {props.type ? 'alterada' : 'salva'} com sucesso!</div> : <div className="modal-body">
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

                    </div>}
                    {loading ? <div></div>: loaded ? 
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={clearModal}>OK</button>
                        </div> : 
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary"  onClick={handleSave} id="saveButton2" >{props.type ? 'SALVAR': 'CADASTRAR'}</button>
                        </div>}
                </form>
            </div>
        </div>
    )
}


export default RegisterGeneral
