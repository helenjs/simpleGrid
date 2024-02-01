import styles from './ImageGrid.module.css';
import { useParams, Link } from "react-router-dom";
import { Block } from '../../gridInterface';

export interface ImageGridProps {
  data: Partial<Block>[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({data}) => {
  const { id } = useParams() as { id: string };

  return (
    <>
      { data.map((image)=> (
        <Link
          to={`/${image.id}`}
          className={styles.imageGrid} key={image.id} data-testid="image-grid">
          <div
            className={`${styles.gridItem} ${id === image.id ? styles.active : ""}`}
            style={{backgroundImage: `url(${image?.options?.url})`}}
          />
        </Link>
      ))}
    </>
  )
};
