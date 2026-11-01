import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  return <footer className={styles.footer}>
    <div className={styles.content}>
      <p className={styles.copyright}>
        <span>Bartłomiej Socha</span>
        <span>© {new Date().getFullYear()}</span>
        <span aria-hidden="true">·</span>
        <span>{t('footer.rights')}</span>
      </p>
    </div>
  </footer>;
};
export default Footer;
