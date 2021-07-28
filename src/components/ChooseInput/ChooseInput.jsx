import React from 'react'
import { Link } from 'react-router-dom'
import pcpImg from '../../assets/images/pcp_assistent.png'
import operador from '../../assets/images/operator.png'

const ChooseInput = () =>{
    return (
        
        <div className='container d-flex flex-wrap'>
            <div className='card col-4 m-2' >
               <div className='card-body p-2'>
                 <div  className='d-flex flex-column align-items-center'>
                    <img src={pcpImg} alt="" height="400px"/>
                    <p>Sou assistente de PCM e desejo acessar a área administrativa</p>
                     <Link to='/login'> <button className='btn btn-primary'>Ir para o Login</button></Link>
                 </div>
               </div>
            </div>

            <div className='card col-4 m-2'>
                <div className='card-body p-2'>
                  <div className='d-flex flex-column align-items-center'>
                    <img src={operador} alt="" height="400px"/>
                    <p>Sou operador de máquina e quero preencher formulário de anomalias</p>
                    <Link to='/keeping'><button className='btn btn-primary'>Preencher Formulário</button></Link>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseInput