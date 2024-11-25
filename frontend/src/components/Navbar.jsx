import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <header>
      <div className={styles.container}>
        <Link to="/">
          <h1>🏀 NBA App</h1>
        </Link>
        <nav>
          {user ? (
            <div>
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
