import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectsDescription from './ProjectsDescription/ProjectsDescription';
import ProjectsCardSm from './ProjectCardSm/ProjectCardSm';
import Carousel from '../Carousel/Carousel';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }));

const project = {
  id: 'migration', titleKey: 'project.title', descriptionKey: 'project.description',
  icons: [], iconsSm: [], imageSm: '/project.png', page: 'https://example.com',
};

afterEach(() => jest.useRealTimers());

test('project descriptions transition between the placeholder and selection on React 19', () => {
  jest.useFakeTimers();
  const { rerender } = render(<ProjectsDescription selectedProject={null} />);
  expect(screen.getByText('projects.hoverMessage')).toBeInTheDocument();
  rerender(<ProjectsDescription selectedProject={project} />);
  act(() => jest.advanceTimersByTime(650));
  expect(screen.getByText('project.description')).toBeInTheDocument();
  rerender(<ProjectsDescription selectedProject={null} />);
  act(() => jest.advanceTimersByTime(650));
  expect(screen.getByText('projects.hoverMessage')).toBeInTheDocument();
  expect(screen.queryByText('project.description')).not.toBeInTheDocument();
});

test('the mobile project dialog opens and closes with the upgraded Material UI', async () => {
  render(<ProjectsCardSm project={project} />);
  fireEvent.click(screen.getByRole('button', { name: 'projects.see' }));
  expect(await screen.findByRole('dialog', { name: 'project.title' })).toBeInTheDocument();
  expect(screen.getByText('project.description')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'close' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(document.body.style.overflow).not.toBe('hidden');
});

test('carousel slide transitions use explicit DOM refs on React 19', () => {
  jest.useFakeTimers();
  render(<Carousel carouselSlides={[
    { title: 'First slide', url: '/first.png' },
    { title: 'Second slide', url: '/second.png' },
  ]} />);
  fireEvent.click(screen.getAllByText('•')[1]);
  act(() => jest.advanceTimersByTime(550));
  expect(screen.getByRole('img', { name: 'Second slide' })).toBeInTheDocument();
  expect(screen.queryByRole('img', { name: 'First slide' })).not.toBeInTheDocument();
});
