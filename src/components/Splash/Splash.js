import styles from './Splash.module.scss';
import Achivments from '../Achivments/Achivments';
import splashPhoto from '../../assets/HomePhotos/splashPhoto2.png';
import Navigation from '../Navigation/Navigation';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const Splash = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.splash}>
      <Navigation />
      <div className={styles.content} data-aos="zoom-out">
        <div className={styles.image}>
          <img alt="#" src={splashPhoto}></img>
        </div>
        <div className={styles.description}>
          <p>
            <span>{t('splash.hello.world')}</span>! {t('splash.my.name')}{' '}
          </p>
          <p>{t('splash.socha')}</p>
          <p>{t('splash.frontend.developer')}</p>
          <p>{t('splash.description')}</p>
          <Button href="#contact" className={styles.button}>
            {t('splash.btn.contact')}
          </Button>
        </div>
      </div>
      <Achivments />
    </div>
  );
};

export default Splash;
