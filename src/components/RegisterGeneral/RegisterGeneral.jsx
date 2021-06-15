import React, {useState} from 'react';

const RegisterGeneral = (props) => {
    const [machines, setMachines] = useState(['SOPRADORA', 'ENVASADORA', 'CHILER']);

    return (
        <div className='register-page'>
            {/* <div className='container ' > */}
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
                                                        <span className='m-1'><i className="far fa-trash-alt"></i></span>
                                                        <span className='m-1'><i className="far fa-edit"></i></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <button className='btn btn-primary mt-2'><i class="fas fa-plus-circle"></i> Nova Máquina</button>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">Profile.</div>
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">Contact.</div>
                </div>

            {/* </div> */}
        </div>
    );
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