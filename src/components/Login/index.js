import './styles.css';
import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div>
            {/* <header>
                <nav className="navbar bg-primary ">
                    <h3 className="text-white">SINC - MANUTENÇÃO</h3>
                </nav>
            </header> */}

            <body>
                <main className="container">
                    <div className="card col-6 p-3">
                        <div>
                            <h4 className="text-center">Bem vindo de volta</h4>
                            <p className="text-center">Entre com suas credenciais de acesso</p>
                        </div>
                        <div className='form-login'>
                            <div className="form-floating">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Email</label>
                            </div>
                            <div className="form-floating mt-1">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label for="floatingPassword">Senha</label>
                            </div>


                            <button className="w-100 btn btn-lg btn-primary mt-2" type="button"><Link to="/home">Entrar</Link></button>

                        </div>

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

