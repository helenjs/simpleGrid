import styles from './Styles.module.css';

import {useParams} from 'react-router-dom';
import { Header } from './components/Header/Header';

export const App = () => {
  const { id } = useParams() as { id: string };

  return (
    <>
      <Header />
      <main className={styles.main} data-testid="main">
      </main>
    </>
  );
};
