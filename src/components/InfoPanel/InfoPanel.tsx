import styles from './InfoPanel.module.css';

export interface InfoPanelProps {
  id?: string,
  description?: string,
  dimensions?: string,
  createdAt?: string
}

export const InfoPanel = (props: InfoPanelProps) => {
  const { id, description, dimensions, createdAt } = props;

  if (!id) {
    return <aside className={styles.panel}></aside>;
  }

  return (
    <aside className={styles.panel} data-testid="info-panel">
      <h2 className={styles.heading}>Block info</h2>
      <dl>
        <dt className={styles.title}>ID:</dt>
        <dd className={styles.details} data-testid="info-panel-id">{id}</dd>

        <dt className={styles.title}>Description:</dt>
        <dd className={styles.details} data-testid="info-panel-description">{description}</dd>

        <dt className={styles.title}>Dimensions:</dt>
        <dd className={styles.details} data-testid="info-panel-dimension">{dimensions}</dd>

        <dt className={styles.title}>Created at:</dt>
        <dd className={styles.details} data-testid="info-panel-created-date">{createdAt}</dd>
      </dl>
    </aside>
  );
};
