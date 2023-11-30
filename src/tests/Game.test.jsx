import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import Game from '../pages/Game';
import * as fetch from '../services/fetchItunes';
import { responseMock } from './mocks/responseMock';

describe('Game', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should be able to see 'Beatles Challenge on the screen'", () => {
    const { getByText } = render(<Game />);
    expect(getByText('Beatles Guessing Challenge')).toBeInTheDocument();
  });

  test('if getSongsFromAlbum has been called', async () => {
    const getSongsFromAlbum = vi.spyOn(fetch, 'getSongsFromAlbum');
    getSongsFromAlbum.mockResolvedValue(responseMock);
    render(<Game />);
    await waitFor(() => expect(getSongsFromAlbum).toHaveBeenCalledOnce());
  });
});
