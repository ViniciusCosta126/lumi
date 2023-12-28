import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import './main.scss'
import api from '../../utils/axios';
import Chart from '../../components/Chart';
const Dash = () => {
    const [dados, setDados] = useState([]);
    const [numeroClientes, setNumeroClientes] = useState([])
    const [meses, setMeses] = useState([])

    const [showChartEnerg, setShowChartEnerg] = useState(true)
    const [showChartEnergCompens, setShowChartEnergCompens] = useState(false)
    const [showChartGD, setShowChartGD] = useState(false)
    const [showChartEcon, setShowChartEcon] = useState(false)
    const buscaDados = async () => {
        const res = await api.get('dados').then((response) => response.data);
        setDados(res);

        const clientes = res.map((dado) => dado.numero_cliente);
        const clientesUnicos = [...new Set(clientes)]; // Filtra apenas os meses únicos
        setNumeroClientes(clientesUnicos);

        const mesesValores = res.map((dado) => dado.mes)
        const mesesUnicos = [...new Set(mesesValores)]
        setMeses(mesesUnicos)
    };

    useEffect(() => {
        buscaDados();
    }, []);


    const handleInputCheck = (nome) => {
        if (nome === 'chartEnerg') {
            setShowChartEnergCompens(false)
            setShowChartGD(false)
            setShowChartEcon(false)
            setShowChartEnerg(true)
        }
        else if (nome === 'energCompens') {
            setShowChartEnergCompens(true)
            setShowChartGD(false)
            setShowChartEcon(false)
            setShowChartEnerg(false)
        } else if (nome === 'semGD') {
            setShowChartEnergCompens(false)
            setShowChartGD(true)
            setShowChartEcon(false)
            setShowChartEnerg(false)
        } else {
            setShowChartEnergCompens(false)
            setShowChartGD(false)
            setShowChartEcon(true)
            setShowChartEnerg(false)
        }
    }

    return (
        <div>
            <NavBar />
            <div className="content">
                <h2 className='title'>Escolha qual grafico deseja exibir:</h2>
                <div className='filter'>
                    <label className="checkbox-container">
                       <p>Grafico Consumo de Energia Elétrica KWh</p>
                        <input className="custom-checkbox" checked={showChartEnerg} onChange={() => handleInputCheck('chartEnerg')} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="checkbox-container">
                        <p>Energia Compensada kWh</p>
                        <input className="custom-checkbox" checked={showChartEnergCompens} onChange={() => handleInputCheck('energCompens')} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="checkbox-container">
                        <p>Valor Total sem GD</p>
                        <input className="custom-checkbox" checked={showChartGD} onChange={() => handleInputCheck('semGD')} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="checkbox-container">
                        <p>Economia GD</p>
                       
                        <input className="custom-checkbox" checked={showChartEcon} onChange={() => handleInputCheck()} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                </div>
                {showChartEnerg && (
                    <Chart
                        data={dados}
                        clientes={numeroClientes}
                        meses={meses}
                        titulo={'Consumo de Energia Elétrica KWh'}
                        index = {1}
                    />
                )}
                {showChartEnergCompens && (
                    <Chart data={dados} clientes={numeroClientes} meses={meses} titulo={'Energia Compensada kWh'} index={2} />
                )}
                {showChartGD && (
                    <Chart data={dados} clientes={numeroClientes} meses={meses} titulo={'Valor Total sem GD'} index={3} />
                )}
                {showChartEcon && (
                    <Chart data={dados} clientes={numeroClientes} meses={meses} titulo={'Economia GD'} index={4} />
                )}


            </div>
        </div>
    )
}

export default Dash