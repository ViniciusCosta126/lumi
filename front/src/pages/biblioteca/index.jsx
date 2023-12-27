import React, { useEffect, useState } from 'react'
import api from '../../utils/axios'
import NavBar from '../../components/NavBar'
import './main.scss'
import Card from '../../components/CardLib'
import uniqueId from '../../utils/idGenerator'
const Biblioteca = () => {
    const [dados, setDados] = useState([]);
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [filtroAtivo, setFiltroAtivo] = useState(false);

    const [numeroClientes, setNumeroClientes] = useState([])
    const [meses, setMeses] = useState([])

    const [mesReferencia, setMesReferencia] = useState('')
    const [fatura, setFatura] = useState('');

    const buscaDados = async () => {
        const res = await api.get('dados').then((response) => response.data);
        setDados(res);
        setDadosFiltrados(res);

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

    useEffect(() => {
        if (filtroAtivo) {

            let filteredData = dados
            if (fatura !== '') {
                filteredData = filteredData.filter((dado) => dado.numero_cliente === fatura);
            }
            if (mesReferencia !== '') {
                filteredData = filteredData.filter((dado) => dado.mes === mesReferencia);
            }
            setDadosFiltrados(filteredData);
        } else {
            setDadosFiltrados(dados); // Define dados filtrados como dados originais se o filtro não estiver ativo
        }
    }, [fatura, mesReferencia, dados, filtroAtivo]);

    const handleSelectCliente = (e) => {
        const valor = e.target.value;
        setFatura(valor);
        setFiltroAtivo(valor !== ''); // Ativa o filtro somente se houver texto no input
    };

    const handleSelectMes = (e) => {
        const valor = e.target.value
        setMesReferencia(valor)
        setFiltroAtivo(valor !== ''); 
    }

    return (
        <div>
            <NavBar />
            <main className='content'>

                <div className='filter'>
                    <div className="container-select">
                        <p>Nº do Cliente</p>
                        <select name="" id="" onChange={(e) => handleSelectCliente(e)} value={fatura}>
                            <option value="">Selecione um cliente</option>
                            {numeroClientes.map((dado) => {
                                return <option key={uniqueId()} value={dado}>{dado}</option>
                            })}
                        </select>
                    </div>
                    <div className="container-select">
                        <p>Mes Referencia</p>
                        <select name="" id="" onChange={(e) => handleSelectMes(e)} value={mesReferencia}>
                            <option value="">Selecione um mes</option>
                            {meses.map((dado) => {
                                return <option key={uniqueId()} value={dado}>{dado}</option>
                            })}
                        </select>
                    </div>

                </div>
                <div className="cards-container">
                    {dadosFiltrados.map(dado => {
                        return <Card key={dado.nota} dado={dado} />
                    })}
                </div>

            </main>
        </div>
    )
}

export default Biblioteca