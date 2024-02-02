import styles from './Header.module.css';
import { Link } from "react-router-dom";

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.logoWrapper}>
      <Link to="/" className={styles.logo} data-testid="logo">Gallery</Link>
    </div>
  </header>
);
