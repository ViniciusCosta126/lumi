
import './main.scss'
const Card = ({ dado }) => {

  const downloadFatura = (caminho)=>{
    var linkDownload = document.createElement('a')
    linkDownload.href = caminho
    linkDownload.download= dado.nota
    linkDownload.click()
  }
  
  return (
    <div className='card'>
      <p>Fatura: {dado.nota}</p>
      <p>Nº Cliente: {dado.numero_cliente}</p>
      <p>Mês Referencia: {dado.mes}</p>
      <p>Valor total: <span>R${125.52}</span></p>
        <button onClick={()=> downloadFatura(dado.caminho)}>
          <svg className="feather feather-download" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        </button>
    </div>
  )
}

export default Card