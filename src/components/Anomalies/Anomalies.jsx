import React from 'react'

const Anomalies = () =>{


    const anomalies = [
        {
            id: 1,
            department: 'SABÃO',
            lineProduction: 'S. GLICERINADO',
            machine: 'EMBALADORA',
            description: 'Cabo com mau contato em um dos bornes do contador de acionamento dos ventiladores do forno',
            solved: true, 
        },
        {
            id: 2,
            department: 'SABÂO',
            lineProduction: 'S. RAJADO',
            machine: 'FABRICADORA',
            description: 'Fiação elétrica no geral exposta (realizar melhoria)',
            solved: true, 
        },
        {
            id: 3,
            department: 'LÍQUIDO',
            lineProduction: 'DETERGENTE',
            machine: 'ENVASADORA',
            description: 'Travamento no exautor da bomba de vácuo e necessidade de troca de controladores de temperatura do coleiro',
            solved: true, 
        },
        {
            id: 4,
            department: 'SABÃO',
            lineProduction: 'S. GLICERINADO',
            machine: 'EMBALADORA',
            description: 'Não foi possível verificar cabeamento e resistências internos do forno',
            solved: true, 
        },

    ]
    return (
        <div className='anomalies'>
            <h3>Anomalias</h3>


            <div className='table-activities'>

            <table className="table  table-primary text-primary table-hover">
                <thead className='header' >
                    <tr>
                        <th scope="col" className="header">Setor</th>
                        <th scope="col" className="header">Descrição</th>
                        <th scope="col" className="header">Linha</th>
                        <th scope="col" className="header">Máquina</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        anomalies.map((anomaly, i) => {
                            return <tr key={i}>
                                <td>{anomaly.department}</td>
                                <td>{anomaly.description}</td>
                                <td>{anomaly.lineProduction}</td>
                                <td>{anomaly.machine}</td>
                            </tr>
                        })
                    }

                </tbody>
            </table>

        </div>
        </div>
    )
}

export default Anomalies;