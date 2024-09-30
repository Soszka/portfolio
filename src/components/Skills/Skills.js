import styles from './Skills.module.scss';
import Title from '../Title/Title';
import AccordionCarousel from '../AccordionCarousel/AccordionCarousel';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';

const Skills = () => {
  const skills = useSelector((state) => state.skills);

  return (
    <div>
      <Navigation />
      <Title>My Skills</Title>
      <div className={styles.skills}>
        {skills.map((skill) => (
          <AccordionCarousel key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
