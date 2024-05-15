import styles from './Amazon.module.css';
import NavBar from '../../components/NavBar';
import CardAmazonComp from '../../components/Cards/CardAmazonComp'

function CardAmazon() {
    return (
        <>
            <NavBar />
            <h1>Card Amazon</h1>
            <CardAmazonComp />
            
        </>
    );
}

export default CardAmazon;