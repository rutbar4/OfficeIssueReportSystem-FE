import { render } from '@testing-library/react';

import App from 'src/pages/App/App';

describe('<App />', () => {
  it('should render App', async () => {
    const result = render(<App />);

    expect(await result.findByText('Hello World!', { exact: false })).toBeInTheDocument();
  });
});
