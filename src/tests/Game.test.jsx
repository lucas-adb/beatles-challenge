import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, test, vi, jest } from 'vitest';
import Game from '../pages/Game';
import * as fetch from '../services/fetchItunes';

describe('Game', () => {
  test("should be able to see 'Beatles Challenge on the screen'", () => {
    const { getByText } = render(<Game />);

    expect(getByText('Beatles Guessing Challenge')).toBeInTheDocument();
  });

  test('if getSongsFromAlbum has been called', async () => {
    const getSongsFromAlbum = vi.spyOn(fetch, 'getSongsFromAlbum');
    render(<Game />);
    expect(getSongsFromAlbum).toHaveBeenCalledOnce();
  });
});
