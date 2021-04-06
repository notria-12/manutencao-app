import './styles.css';

function Login(){
    return (
        <div>
            <header>
                <nav className="navbar">
                    <h3>SINC - MANUTENÇÃO</h3>
                </nav>
            </header>

            <body>
                <main className="container">
                    <div className="form-login">
                        <form>
                            <label>Usuario</label>
                            <input type="text"></input>
                            <label>Senha</label>
                            <input type="password"></input>
                        </form>
                    </div>
                </main>
            </body>

            <footer>
                <p>Aqui meu rodapé</p>
            </footer>
        </div>
    );

}

export default Login;

