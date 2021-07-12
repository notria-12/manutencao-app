import './styles.css';
import React, {useRef, useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom'

function Login() {
    const {login} = useAuth();
    let emailRef = useRef();
    let passwordRef = useRef();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/home/calendar');
        }catch(error){
            setError('Erro ao logar, verifique seu email e senha!')
        }
        
        setLoading(false)
    }

    return (
        <div>
            {/* <header>
                <nav className="navbar bg-primary ">
                    <h3 className="text-white">SINC - MANUTENÇÃO</h3>
                </nav>
            </header> */}

            <body>
                <main className="container d-flex flex-column ">
                    {error && <div class="alert alert-danger" role="alert">{error}</div> }
                    <div className='d-flex justify-content-start bg-primary col-6'>
                        <Link to='/'><button className='btn text-white'><span><i className="fas fa-long-arrow-alt-left "></i> Voltar</span></button></Link>
                    </div>
                    <div className="card col-6 p-3">
                        <div>
                            <h4 className="text-center">Bem vindo de volta</h4>
                            <p className="text-center">Entre com suas credenciais de acesso</p>
                        </div>
                        <form className='form-login' onSubmit={handleSubmit}>
                            <div className="form-floating">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" ref={emailRef} required/>
                                <label for="floatingInput">Email</label>
                            </div>
                            <div className="form-floating mt-1">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={passwordRef} required/>
                                <label for="floatingPassword">Senha</label>
                            </div>

                            <input type="submit" className="w-100 btn btn-lg btn-primary mt-2" value="Entrar" disabled={loading}></input>

                        </form>

                    </div>

                </main>
            </body>
            {/* 
            <footer>
                <p>Aqui meu rodapé</p>
            </footer> */}
        </div>
    );

}

export default Login;

