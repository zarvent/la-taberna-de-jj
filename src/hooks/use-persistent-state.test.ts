
import { renderHook, act } from '@testing-library/react';
import usePersistentState from './use-persistent-state';

describe('usePersistentState', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should update state correctly when using functional updates', () => {
    const { result } = renderHook(() => usePersistentState('test-key', 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it('should handle sequential functional updates correctly in the same render cycle', () => {
    const { result } = renderHook(() => usePersistentState('test-key', 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
      result.current[1]((prev) => prev + 1);
    });

    // If the bug exists, this might be 1 instead of 2
    expect(result.current[0]).toBe(2);
  });
});
