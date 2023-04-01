import { render, screen } from '@testing-library/react';
import { EcgProvider, useEcg } from './index';
import { renderHook, act } from '@testing-library/react-hooks';

describe('EcgProvider', () => {
  it('renders children', () => {
    render(
      <EcgProvider>
        <div>Child component</div>
      </EcgProvider>
    );
    screen.getByText('Child component');
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <EcgProvider>{children}</EcgProvider>
  );

  it('increases zoom', () => {
    const { result } = renderHook(() => useEcg(), { wrapper });

    expect(result.current.controlsUtils.zoom).toBe(1);

    act(() => {
      result.current.controlsUtils.increaseZoom();
    });

    expect(result.current.controlsUtils.zoom).toBe(1.2);
  });

  it('reduces zoom', () => {
    const { result } = renderHook(() => useEcg(), { wrapper });

    expect(result.current.controlsUtils.zoom).toBe(1);

    act(() => {
      result.current.controlsUtils.reduceZoom();
    });

    expect(result.current.controlsUtils.zoom).toBe(0.8);
  });
});
