import styles from './About.module.scss';
import Title from '../Title/Title';
import Animation from '../Animation/Animation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const splitIntoSentences = (text) => {
  const rawParts = text
    .split('. ')
    .map((part) => part.trim())
    .filter(Boolean);

  return rawParts.map((part, index) => {
    const isLast = index === rawParts.length - 1;
    if (part.endsWith('.') || isLast) {
      return part;
    }
    return `${part}.`;
  });
};

const groupSentencesIntoParagraphs = (sentences, size = 2) => {
  const paragraphs = [];

  for (let i = 0; i < sentences.length; i += size) {
    paragraphs.push(sentences.slice(i, i + size).join(' '));
  }

  return paragraphs;
};

const About = () => {
  const { t } = useTranslation();
  const description = t('about.description');

  const sentences = splitIntoSentences(description);
  const paragraphs = groupSentencesIntoParagraphs(sentences);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.about}>
      <Title>{t('about.title')}</Title>
      <div className={styles.content}>
        <div className={styles.description} data-aos="slide-right">
          <div className={styles.descriptionCard}>
            <div className={styles.paragraphs}>
              {(paragraphs.length ? paragraphs : [description]).map(
                (paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )
              )}
            </div>
          </div>
        </div>
        <Animation />
      </div>
    </div>
  );
};

export default About;
