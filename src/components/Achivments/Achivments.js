import styles from './Achivments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const AMBIENT_POSITIONS = [18, 50, 82];

const Achivments = () => {
  const { t } = useTranslation();
  const achivments = useSelector((state) => state.achivments);
  const [activeId, setActiveId] = useState(null);
  const [ambientColumn, setAmbientColumn] = useState(1);

  const handleSectionPointerMove = (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;

    const sectionBounds = event.currentTarget.getBoundingClientRect();
    const relativeX = Math.min(
      Math.max(event.clientX - sectionBounds.left, 0),
      sectionBounds.width
    );
    const nextColumn = Math.min(
      2,
      Math.floor((relativeX / Math.max(sectionBounds.width, 1)) * 3)
    );

    setAmbientColumn((currentColumn) =>
      currentColumn === nextColumn ? currentColumn : nextColumn
    );
  };

  const handleSectionPointerLeave = () => {
    setActiveId(null);
    setAmbientColumn(1);
  };

  const handlePointerMove = (event, id) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();

    setActiveId(id);
    card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <section
      className={styles.achivments}
      style={{
        '--ambient-x': `${AMBIENT_POSITIONS[ambientColumn]}%`,
      }}
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
    >
      <div className={styles.container} data-has-active={activeId !== null}>
        {achivments.map((achivment, index) => (
          <article
            className={`${styles.achivment} ${
              activeId === achivment.id ? styles.active : ''
            }`}
            key={achivment.id}
            style={{ '--reveal-delay': `${index * 90}ms` }}
            onMouseEnter={() => setActiveId(achivment.id)}
            onPointerMove={(event) => handlePointerMove(event, achivment.id)}
            onPointerLeave={() => setActiveId(null)}
          >
            <FontAwesomeIcon
              className={styles.backdropIcon}
              icon={achivment.icon}
              aria-hidden="true"
            />
            <div className={styles.achivmentHeader}>
              <div className={styles.iconWrap}>
                <FontAwesomeIcon
                  className={styles.achivmentIcon}
                  icon={achivment.icon}
                  aria-hidden="true"
                />
              </div>
              <h3>{t(achivment.titleKey)}</h3>
            </div>
            <p>{t(achivment.descriptionKey)}</p>
            <span className={styles.lightTrace} aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Achivments;
