import { render, screen, waitFor } from '@testing-library/react';

import TextBox from './TextBox'

test('renders textarea element', async () => {
  render(<TextBox />);
  const textAreaElement = screen.getByTestId('text-box-textarea')
  await waitFor(() => {
    expect(textAreaElement).toBeInTheDocument();
  })
});
