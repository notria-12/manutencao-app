
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './KeepingForm.css'

const KeepingForm = () => {

    const activities = [
        {
            "activity": 'CORREIA DO SERVO DA PRENSA: VERIFICAR A TENSÃO DA CORREIA A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.',
            "status": 3,
            'item': 1
        },
        {
            "activity": 'CORREIA DO SERVO DO ESTIRAMENTO: VERIFICAR A TENSÃO DA CORREIA, A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.',
            "status": 3,
            "item": 2
        },
        {
            "activity": 'CORREIA DA TRAÇÃO DO ESTIRAMENTO: VERIFICAR A TENSÃO DA CORREIA, A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.',
            "status": 3,
            "item": 3
        },
        {
            "activity": 'ALTURA DOS BOCAIS: COM A PRENSA FECHADA E TRÊS PRÉ-FORMAS DENTRO ABAIXAR OS BOCAIS; ACIONAR CARGA E SOPRO LIBERAR O APERTO DO EIXO DO PISTÃO DO BOCAL ATÉ COMECE A VAZAR ENTÃO APERTAR ¼ DE VOLTA.',
            "status": 3,
            "item": 4
        },
        {
            "activity": 'ALINHAMENTO RÉGUA/ PRENSA: COM A PRENSA FECHADA VERIFICAR A CENTRALIZAÇÃO DA RÉGUA NO MOLDE.',
            "status": 3,
            "item": 5
        },
        {
            "activity": 'ALTURA RÉGUA/PRENSA: COM A PRENSA FECHADA E TRÊS PRÉ-FORMAS DENTRO FECHAR A RÉGUA COM ELA AVANÇADA E DEPOIS RECUADA AS PINÇAS DEVEM PEGAR A PRÉ-FORMA NA REGIÃO DO LACRE.',
            "status": 3,
            "item": 6
        },
        {
            "activity": 'CORREIA DO SERVO DA RÉGUA: VERIFICAR A TENSÃO DA CORREIA A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.',
            "status": 3,
            "item": 7
        },
        {
            "activity": 'CORREIA DA TRAÇÃO DA RÉGUA: VERIFICAR A TENSÃO DA CORREIA A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.',
            "status": 3,
            "item": 8
        },
        {
            "activity": 'CORREIA DA TRAÇÃO DA RÉGUA: VERIFICAR A TENSÃO DA CORREIA A MESMA NÃO DEVE ESTAR DEMASIADAMENTE ESTICADA, DESALINHADA E/OU COM DENTES DANIFICADOS.',
            "status": 3,
            "item": 9
        }
    ]

    const [current, setCurrent] = useState(0)
    const [disableBackButton, setDisableBackButton] = useState(false)
    const [isLastPage, setIsLastPage] = useState(false)

    useEffect(() => {
        if (current < 4) {
            setDisableBackButton(true)
        } else {
            setDisableBackButton(false)
        }

        if (current > (activities.length - 4)) {
            setIsLastPage(true)
        } else {
            setIsLastPage(false)
        }

        // if(current >)
    }, [current]);


    const addActivity = (activityDesc) =>{
        const activity = { activity: activityDesc, item: activities.length+1, status: 3};

        activities.push(activity);
    }

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
                            activities.filter(activity => activity.item > current && activity.item <= (current + 4)).map((activity, i) => {
                                return <div className='card d-flex flex-row align-items-center m-1' key={i}>
                                    <div className='item-number'>
                                        <h5>{activity.item}</h5>
                                    </div>

                                    <div className=' p-2'>
                                        <h6>
                                            {activity.activity}
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
                        {
                            isLastPage ? <button className='btn btn-primary m-2 ' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i className="fas fa-plus-circle "></i> Adicionar Atividade
                            </button> : <div></div>
                        }


                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-primary m-1' onClick={() => {
                                if (current > 3) {
                                    setCurrent(current - 4)
                                }
                            }} disabled={disableBackButton}>VOLTAR</button>
                            <button className='btn btn-primary m-1' onClick={() => {
                                if (current < (activities.length - 4)) {
                                    setCurrent(current + 4)
                                }
                            }} >AVANÇAR</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal addActivity={addActivity}>

            </Modal>
        </div>
    )
}

function Modal(props) {
    const [activityDesc, setActivityDesc] = useState('')

    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export default KeepingForm