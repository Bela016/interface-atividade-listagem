import styles from './Amazon.module.css';
import NavBar from '../../components/NavBar';
import React from 'react';
import { useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import AmazonRequests from '../../Fetch/AmazonRequests';



function TabelaAmazon() {
    const [amazon, setamazon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Número de itens por página
    const [pageNumberInput, setPageNumberInput] = useState(""); // Estado para armazenar o número da página inserido pelo usuário

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ListarAmazon = await AmazonRequests.ListarAmazon();
                setamazon(ListarAmazon);
            } catch (error) {
                console.error('Erro ao buscar animais: ', error);
            }
        };

        fetchData();
    }, []);

    // Atualiza o valor do campo de entrada ao mudar de página
    useEffect(() => {
        setPageNumberInput(currentPage.toString());
    }, [currentPage]);

    // Função para calcular o índice inicial e final dos itens a serem exibidos na página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentamazon = amazon.slice(indexOfFirstItem, indexOfLastItem);

    // Função para navegar para a página inserida pelo usuário ao digitar o número
    const handlePageInputChange = (e) => {
        const pageNumber = parseInt(e.target.value);
        if (pageNumber > 0 && pageNumber <= Math.ceil(amazon.length / itemsPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <NavBar />
            <h1>Tabela Amazon</h1>
            {amazon.length > 0 ? (
                <>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Data da Venda</th>
                                <th>Nome</th>
                                <th>Edição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentamazon.map((amazon) => (
                                <tr key={amazon.id_livro} amazon={amazon}>
                                    <td>{amazon.id_livro}</td>
                                    <td>{amazon.data_venda}</td>
                                    <td>{amazon.nome_produto}</td>
                                    <td>{amazon.edicao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Componente de paginação */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <input
                                type="number"
                                min="1"
                                max={Math.ceil(amazon.length / itemsPerPage)}
                                value={pageNumberInput}
                                onChange={(e) => {
                                    setPageNumberInput(e.target.value);
                                    handlePageInputChange(e); // Navega automaticamente para a página ao digitar o número
                                }}
                            />
                            <span> de {Math.ceil(amazon.length / itemsPerPage)}</span>
                        </div>
                        <div>
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === Math.ceil(amazon.length / itemsPerPage)}
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Carregando ...</p>
            )}
        </>
    );
}

export default TabelaAmazon;