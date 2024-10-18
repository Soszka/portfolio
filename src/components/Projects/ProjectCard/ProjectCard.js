import React, { useState, useRef } from 'react';
import styles from './ProjectCard.module.scss';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({ project, setSelectedProject }) => {
  const [style, setStyle] = useState({});
  const [bgStyle, setBgStyle] = useState({});
  const [isLeaving, setIsLeaving] = useState(false);
  const cardRef = useRef(null);
  const mouseLeaveTimeout = useRef(null);
  const { t } = useTranslation();

  const handleMouseMove = (e) => {
    if (isLeaving) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const mouseX = e.clientX - rect.left - cardWidth / 2;
    const mouseY = e.clientY - rect.top - cardHeight / 2;
    const rotateX = (mouseY / cardHeight) * -30;
    const rotateY = (mouseX / cardWidth) * 30;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });

    setBgStyle({
      transform: `translateX(${(mouseX / cardWidth) * -40}px) translateY(${
        (mouseY / cardHeight) * -40
      }px)`,
    });
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveTimeout.current);
    setIsLeaving(false);
    setSelectedProject(project);
  };

  const handleMouseLeave = () => {
    setIsLeaving(true);
    mouseLeaveTimeout.current = setTimeout(() => {
      setStyle({
        transform: `rotateX(0deg) rotateY(0deg)`,
      });
      setBgStyle({
        transform: `translateX(0px) translateY(0px)`,
      });
      setIsLeaving(false);
    }, 0); // Możesz dostosować czas opóźnienia
    setSelectedProject(null);
  };

  const handleClick = () => {
    window.open(project.page, '_blank'); // Opens the page in a new tab
  };

  return (
    <div
      className={styles.cardWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={cardRef}
    >
      <div className={styles.card} style={style}>
        <div
          className={styles.cardBg}
          style={{ backgroundImage: `url(${project.image})`, ...bgStyle }}
        ></div>
        <div className={styles.cardInfo}>
          <h1>{t(project.titleKey)}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
