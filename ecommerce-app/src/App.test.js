import { render } from '@testing-library/react';
import App from './App';

test('renders e-commerce app without crashing', () => {
  const { baseElement } = render(<App />);
  // The app should render successfully
  expect(baseElement).toBeInTheDocument();
});
