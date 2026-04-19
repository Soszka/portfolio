import styles from './Title.module.scss';

const Title = (props) => {
  const titleText = String(props.children ?? '').trim();
  const words = titleText.split(/\s+/);
  const firstWord = words[0] ?? '';
  const secondPart = words.slice(1).join(' ');

  return (
    <h1 className={styles.title} data-aos="zoom-in">
      <span className={styles.titleWord}>{firstWord}</span>
      {secondPart ? (
        <span className={styles.secondTitleWord}>{secondPart}</span>
      ) : null}
    </h1>
  );
};

export default Title;
