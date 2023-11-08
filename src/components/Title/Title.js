import styles from './Title.module.scss';

const Title = (props) => {
  const words = props.children.split(' '); 
  return (
    <h1 className={styles.title} data-aos="slide-up">
      {words[0]} <span className={styles.secondTitleWord}>{words[1]}</span>
    </h1>
  );
};

export default Title;