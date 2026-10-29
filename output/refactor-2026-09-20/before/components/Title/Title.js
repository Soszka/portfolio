import styles from './Title.module.scss';
import ShimmerText from '../ShimmerText/ShimmerText';
const Title = ({ children, accentWords }) => {
  const words = String(children ?? '').trim().split(/\s+/);
  return <h2 className={styles.title}>
    {words.map((word, index) => <ShimmerText key={`${word}-${index}`}
      accent={accentWords ? accentWords.includes(index) : index > 0}>{word}</ShimmerText>)}
  </h2>;
};
export default Title;
