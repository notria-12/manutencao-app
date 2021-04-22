import React from 'react'
import { Link } from 'react-router-dom'
import './KeepingForm.css'

const KeepingForm = () => {

    const activities = [
        'CORREIA DO SERVO DA PRENSA: VERIFICAR A TENSÃO DA CORREIA A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.',
        'CORREIA DO SERVO DO ESTIRAMENTO: VERIFICAR A TENSÃO DA CORREIA, A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.',
        'CORREIA DA TRAÇÃO DO ESTIRAMENTO: VERIFICAR A TENSÃO DA CORREIA, A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.',
        'ALTURA DOS BOCAIS: COM A PRENSA FECHADA E TRÊS PRÉ-FORMAS DENTRO ABAIXAR OS BOCAIS; ACIONAR CARGA E SOPRO LIBERAR O APERTO DO EIXO DO PISTÃO DO BOCAL ATÉ COMECE A VAZAR ENTÃO APERTAR ¼ DE VOLTA.',
    //     'ALINHAMENTO RÉGUA/ PRENSA: COM A PRENSA FECHADA VERIFICAR A CENTRALIZAÇÃO DA RÉGUA NO MOLDE.',
    //     'ALTURA RÉGUA/PRENSA: COM A PRENSA FECHADA E TRÊS PRÉ-FORMAS DENTRO FECHAR A RÉGUA COM ELA AVANÇADA E DEPOIS RECUADA AS PINÇAS DEVEM PEGAR A PRÉ-FORMA NA REGIÃO DO LACRE.',
    ]
    return (
        <div className='keeping-form'>


            <div className="container d-flex flex-wrap">

                <div className='card m-2 col-10 d-flex flex-row'>
                    <div className='p-2 bg-primary'>

                    </div>
                    <h1>Manutenção preventiva mecânica</h1>
                </div>
                <div className='card m-2 col-10'>
                    <div className="card-body">
                        <div className='d-flex justify-content-between m-2' >
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
                        </div>
                        {
                            activities.map((activity, i) => {
                                return <div className='card d-flex flex-row align-items-center m-1' key={i}>
                                    <div className='item-number'>
                                        <h5>{i + 1}</h5>
                                    </div>

                                    <div className=' p-2'>
                                        <h6>
                                            {activity}
                                        </h6>
                                    </div>
                                    <div className='p-2'>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                OK
                                        </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Não
                                        </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                ...
                                        </label>
                                        </div>


                                    </div>


                                </div>
                            })
                        }

                        <div className='d-flex justify-content-end'>
                            <Link><button className='btn btn-primary'>AVANÇAR</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KeepingForm