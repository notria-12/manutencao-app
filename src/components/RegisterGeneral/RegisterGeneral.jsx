import { div } from 'prelude-ls';
import React from 'react';

const RegisterGeneral = (props) => {
    return (
        <div className='register-page'>
            <div className='container ' >
              <div className='card'>
                  <div className="card-header">
                      Novos cadastros
                  </div>
                <div className="card-body">
                    <p>O que você deseja cadastrar?</p>
                <div>
                    <button className='btn btn-primary'><i class="fas fa-plus-circle"></i> Nova Máquina</button>
                    <button className='btn btn-primary m-2'><i class="fas fa-plus-circle"></i> Nova Atividade</button>
                    <button className='btn btn-primary'><i class="fas fa-plus-circle"></i> Nova Anomalia</button>
                </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default RegisterGeneral