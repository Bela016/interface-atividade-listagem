import imgNotFound from '../../assets/404-page-not-found.jpg';
import './CardAmazonComp.css'


    function CardAmazon({ amazon }) {

        const exibeID = () => {
            console.log(amazon.id_livro, "\n", amazon);
        }
    
        return (
            <div className='card-amazon'>
                <img src={imgNotFound} alt="Imagem não encontrada" onClick={exibeID} />
                <p>Data da Venda: {amazon.data_venda}</p>
                <p>Nome: {amazon.nome_produto}</p>
                <p>Edição: {amazon.edicao}</p>
            </div >
        );
    }
    
    export default CardAmazon;