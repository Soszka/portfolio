import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  return <footer className={styles.footer}>
    <div className={styles.content}>
      <p className={styles.signature}>Bartłomiej <span>Socha</span><span className={styles.role}>Software Engineer</span></p>
      <p className={styles.copyright}>© {new Date().getFullYear()} · {t('footer.rights')}</p>
    </div>
  </footer>;
};
export default Footer;
