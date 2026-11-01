import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import PolishFlag from '../../assets/HomePhotos/polishFlagPhoto.png';
import EnglishFlag from '../../assets/HomePhotos/englishFlagPhoto.png';
import styles from './LanguageButton.module.scss';

export default function LanguageButton() {
  const { i18n } = useTranslation();
  const polish = (i18n.resolvedLanguage || i18n.language || 'pl').startsWith('pl');
  return <IconButton className={styles.button} aria-label={polish ? 'Switch to English' : 'Zmień na polski'}
    onClick={() => i18n.changeLanguage(polish ? 'en' : 'pl')}>
    <img src={polish ? EnglishFlag : PolishFlag} alt="" className={styles.flag} />
  </IconButton>;
}
