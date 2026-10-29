import styles from './ShimmerText.module.scss';
export default function ShimmerText({ children, accent = false }) {
  return <span className={`${styles.text} ${accent ? styles.accent : ''}`}>
    {children}
    <span className={styles.halo} aria-hidden="true">{children}</span>
    <span className={styles.shine} aria-hidden="true">{children}</span>
  </span>;
}
