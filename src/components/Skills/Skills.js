import styles from './Skills.module.scss';
import Title from '../Title/Title';
import AccordionCarousel from '../AccordionCarousel/AccordionCarousel';
import { useSelector } from 'react-redux';


const Skills = () => {

  const skills = useSelector (state => state.skills);

  return (
    <div>
      <Title>My Skills</Title>
      <div className={styles.skills}>
        {skills.map((skill) => (
          <AccordionCarousel key={skill.id} skill={skill}/>
        ))}
      </div>
    </div>
  );
}

export default Skills;
