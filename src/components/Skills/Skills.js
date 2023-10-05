import styles from './Skills.module.scss';
import Title from '../Title/Title';
import AccordionCarousel from '../AccordionCarousel/AccordionCarousel';

const Skills = () => {
  return (
    <div>
      <Title>My Skills</Title>
      <div className={styles.skills}>
      <AccordionCarousel />
      </div>
    </div>
  );
}

export default Skills;
