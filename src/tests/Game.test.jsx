import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Game from '../pages/Game';

// use debug() para checar error

describe('Game', () => {
  test("should be able to see 'Beatles Challenge on the screen'", () => {
    const { getByText } = render(<Game />);

    expect(getByText('Beatles Guessing Challenge')).toBeInTheDocument();
  });
});
