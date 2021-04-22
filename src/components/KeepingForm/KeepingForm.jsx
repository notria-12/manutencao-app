import React from 'react'
import './KeepingForm.css'

const KeepingForm = () => {
    return (
        <div className='keeping-form'>


            <div className="container d-flex flex-wrap">
                <div className='card p-2 m-2 col-8'>
                    <h2>Manutenção preventiva mecânica(MICRO)</h2>
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
                        <div className='card d-flex'>
                            <div className='item-number'>
                                <h5>1</h5>
                            </div>

                            <div>
                                <h6>
                                    CORREIA DO SERVO DA PRENSA: VERIFICAR A TENSÃO DA CORREIA A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.
                            </h6>
                            </div>
                            <div >
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


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KeepingForm