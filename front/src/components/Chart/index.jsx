import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './main.scss'
import generateRandomColor from '../../utils/colorGenerator';
const Chart = ({ data, clientes, meses, titulo ,index}) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        aspectRatio:1/1.2,
        scales: {
            x: {
                
                grid: {
                    offset: false
                }
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
                title: {
                    text: 'Nº Cliente',
                    hidden: true,
                    display: true,
                    fontColor:'#000',
                    font: {
                        size: 18
                    }
                },
            },
            title: {
                display: true,
                text: titulo,
                fullSize: true,
                font: {
                    size: 24
                }
            },
        },
    };
    const dataSets = clientes.map(cliente => {
        const valores = data.map(dado => {
            if (dado.numero_cliente === cliente) {
                if(index === 1){
                    const valor = dado.energia_kwh + dado.scee_kwh
                    return valor
                }
                else if(index === 2){
                    return dado.gdi_kwh
                }
                else if(index === 3){
                    const valor = dado.energia_valor_total + dado.scee_valor_total + dado.contrib_valor_total
                    return valor
                }else{
                    return dado.gdi_valor_total
                }
            }
        })

        let newArray = valores.filter((element) => typeof element !== 'undefined');

        var dataSet = {
            label: cliente,
            data: newArray,
            backgroundColor: `${generateRandomColor()}`,
        }
        return dataSet
    })

    const initialData = {
        labels: meses,
        datasets: dataSets
    };

    return <Bar options={options} data={initialData} />;
};

export default Chart;
