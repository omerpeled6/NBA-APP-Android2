import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { useContext } from 'react';
import { PriceAndCountType } from '../PriceAndCountContext';

const Navbar = ({ user, onLogout }) => {
  const { price, setPrice } = useContext(PriceAndCountType);
  const { countPlayer, setCountPlayer } = useContext(PriceAndCountType);

  const priceAndCountClass =
    price === 15 && countPlayer === 5
      ? `${styles.countAndPrice} ${styles.green}`
      : styles.countAndPrice;

  return (
    <header>
      <div className={styles.container}>
        <Link to="/">
          <h1>🏀 NBA App</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <p className={priceAndCountClass}>
                Total - {price} ($) / {countPlayer} (count)
              </p>
              <Link to="/alldreamTeam">⛹🏾‍♂️</Link>
              <Link to="/mydreamTeam">⭐️</Link>
              <Link to="/my-basket">🛒</Link>
              <Link to="/my-players">❤️</Link>
              <span>{user.fullName}</span>
              <button onClick={onLogout}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
