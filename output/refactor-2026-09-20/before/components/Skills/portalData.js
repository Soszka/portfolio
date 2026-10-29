import { technologyIcons } from '../Splash/technologyIcons';
import { faLightbulb, faPeopleGroup, faComments, faPuzzlePiece, faCompass, faListCheck } from '@fortawesome/free-solid-svg-icons';

const select = names => names.map(name => technologyIcons.find(icon => icon.name === name));
const soft = (name, brandIcon) => ({ name, brandIcon, color: '#ff8ac7' });
export const chapters = [
  { id: 'frontend', title: 'Frontend', color: '#29c9ff', rgb: '41, 201, 255',
    icons: select(['Angular', 'TypeScript', 'RxJS', 'JavaScript', 'Sass', 'HTML5', 'CSS3', 'React', 'NgRx']) },
  { id: 'backend', title: 'Backend', color: '#b594ff', rgb: '181, 148, 255',
    icons: select(['Java', 'Spring', 'PostgreSQL', 'Hibernate', 'Maven', 'Redis', 'Apache Kafka']) },
  { id: 'devops', title: 'DevOps', color: '#44ecc5', rgb: '68, 236, 197',
    icons: select(['Docker', 'Kubernetes', 'Git', 'GitHub', 'Terraform', 'Nginx', 'Webpack']) },
  { id: 'tools', title: 'Narzędzia', enTitle: 'Tools', color: '#ffca72', rgb: '255, 202, 114',
    icons: select(['VS Code', 'Git', 'GitHub', 'Webpack', 'Playwright', 'Maven']) },
  { id: 'soft', title: 'Umiejętności miękkie', enTitle: 'Soft skills', color: '#ff8ac7', rgb: '255, 138, 199',
    icons: [soft('Kreatywność', faLightbulb), soft('Współpraca', faPeopleGroup), soft('Komunikacja', faComments),
      soft('Rozwiązywanie problemów', faPuzzlePiece), soft('Adaptacja', faCompass), soft('Organizacja', faListCheck)] },
];
export const copy = {
  pl: {
    skills: 'Umiejętności', language: 'Switch to English', skip: 'Przejdź do treści',
    introText: 'Różne dziedziny tworzą jeden wspólny świat technologii. Łączę interfejsy, logikę aplikacji i narzędzia, które pomagają zamieniać pomysły w działające rozwiązania. Za kodem stoją też komunikacja, kreatywność i współpraca. Poznaj umiejętności, z których korzystam na każdym etapie projektu.',
    frontend: 'Tworzę responsywne aplikacje w Angularze i TypeScript. Łączę przemyślane komponenty, reaktywne dane i czytelne zarządzanie stanem. Dbam o płynność działania, szczegóły interfejsu i wygodę użytkownika. Lubię zamieniać złożone wymagania w proste, intuicyjne doświadczenia.',
    backend: 'Buduję logikę aplikacji w Javie i Springu. Projektuję API, integruję usługi i porządkuję dane w PostgreSQL. Zwracam uwagę na czytelną strukturę kodu oraz przewidywalną komunikację między elementami systemu. Dzięki temu interfejs ma solidne zaplecze do dalszego rozwoju.',
    devops: 'Łączę kod ze środowiskiem, w którym działa. Rozwijam rozwiązania oparte na Dockerze, Kubernetes i automatyzacji dostarczania aplikacji. Dążę do powtarzalnej konfiguracji oraz prostszego uruchamiania projektów. Dobre środowisko pomaga zespołowi skupić się na tworzeniu produktu.',
    tools: 'Dobieram narzędzia tak, aby ułatwiały codzienną pracę i pomagały utrzymać jakość kodu. Korzystam z VS Code, Gita i GitHuba do tworzenia, przeglądania oraz porządkowania zmian. Narzędzia budowania i testowania wspierają mnie w sprawdzaniu kolejnych pomysłów. Chętnie usprawniam powtarzalne czynności i organizuję swój warsztat.',
    soft: 'Kreatywność, jasna komunikacja i współpraca pomagają mi szukać rozwiązań wspólnie z innymi. Łączę samodzielność z otwartością na feedback, odpowiedzialnością i dobrą organizacją pracy. Potrafię dostosować się do zmian i spojrzeć na problem z perspektywy całego zespołu. Te kompetencje rozwijałem przez lata pracy przy różnych projektach i współpracy z zespołami deweloperskimi.',
  },
  en: {
    skills: 'Skills', language: 'Zmień na polski', skip: 'Skip to content',
    introText: 'Different disciplines form one connected world of technology. I bring together interfaces, application logic and tools that turn ideas into working solutions. Communication, creativity and collaboration are just as important as code. Explore the skills I use throughout a project.',
    frontend: 'I build responsive applications with Angular and TypeScript. I combine thoughtful components, reactive data and clear state management. I care about performance, interface details and the user experience. I enjoy turning complex requirements into simple, intuitive interactions.',
    backend: 'I build application logic with Java and Spring. I design APIs, integrate services and organise data in PostgreSQL. I focus on readable code and predictable communication between parts of a system. This gives the interface a solid foundation for further development.',
    devops: 'I connect code with the environments it runs in. I am developing my toolkit around Docker, Kubernetes and automated application delivery. I aim for repeatable configuration and simpler project setup. A reliable environment lets the team focus on building the product.',
    tools: 'I choose tools that make everyday development easier and help maintain code quality. I use VS Code, Git and GitHub to create, review and organise changes. Build and testing tools help me validate new ideas. I enjoy improving repetitive tasks and refining my workflow.',
    soft: 'Creativity, clear communication and collaboration help me find solutions with others. I combine independence with openness to feedback, ownership and good organisation. I adapt to change and consider problems from the whole team’s perspective. I have developed these skills over years of working on different projects and collaborating with development teams.',
  },
};
export const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const smooth = value => { const x = clamp(value); return x * x * (3 - 2 * x); };
export const ranges = [[0, .12], [.12, .29], [.29, .46], [.46, .63], [.63, .80], [.80, 1.02]];
export function chapterAt(progress) {
  const index = ranges.findIndex(([, end]) => progress < end);
  return index < 0 ? chapters.length : index;
}
export function flightPhase(progress, chapter) {
  const [start, end] = ranges[chapter];
  const local = clamp((progress - start) / (end - start));
  if (chapter === 0) {
    const sink = smooth((local - .05) / .92);
    return { local, arrival: 1, departure: sink, scale: 1 - sink * .98, opacity: 1 - smooth((local - .72) / .28), description: 1 - smooth(local / .42) };
  }
  const arrival = smooth(local / .24);
  const departure = chapter === chapters.length ? 0 : smooth((local - .34) / .66);
  return { local, arrival, departure, scale: .045 + arrival * .955 + departure * 2.4,
    opacity: smooth(local / .08) * (1 - departure),
    description: smooth((local - .14) / .16) * (chapter === chapters.length ? 1 : 1 - smooth((local - .40) / .50)) };
}
