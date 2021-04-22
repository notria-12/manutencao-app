import React from 'react'
import { Link } from 'react-router-dom'


const ChooseInput = () =>{
    return (
        <div className='container d-flex flex-wrap'>
            <div className='card col-4 m-2' >
               <div className='card-body'>
               <p>Sou assistente de PCP e quero fazer Login</p>
               <Link to='/login'> <button className='btn btn-primary'>Ir para o Login</button></Link>
               </div>
            </div>

            <div className='card col-4 m-2'>
                <div className='card-body'>
                <p>Sou operador de máquina e quero preencher formulário de anomalias</p>
                <Link to='/keeping'><button className='btn btn-primary'>Preencher Formulário</button></Link>
                </div>
            </div>
        </div>
    )
}

export default ChooseInput