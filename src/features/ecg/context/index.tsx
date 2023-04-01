import { createContext, useContext, useEffect, useState } from 'react';
import data from '../../../assets/data.json';
import { throttle } from 'lodash';

interface EcgTimestamp {
  Time: number;
  1: number;
}

interface ControlsUtils {
  canIncreaseZoom: boolean;
  canReduceZoom: boolean;
  increaseZoom: () => false | void;
  reduceZoom: () => false | void;
  sliderPosition: number | number[];
  handleSliderChange: (event: Event, newValue: number | number[]) => void;
}

interface EcgContext {
  data: EcgTimestamp[];
  controlsUtils: ControlsUtils;
}

const ecgContext = createContext<EcgContext>({} as EcgContext);

export function EcgProvider({ children }: { children: React.ReactNode }) {
  // Zoom
  const [zoom, setZoom] = useState(1);

  const canIncreaseZoom = zoom < 1.8;
  const canReduceZoom = zoom > 0.2;

  const increaseZoom = () =>
    canIncreaseZoom && setZoom(parseFloat((zoom + 0.2).toFixed(1)));
  const reduceZoom = () =>
    canReduceZoom && setZoom(parseFloat((zoom - 0.2).toFixed(1)));

  // Slider
  const [sliderPosition, setSliderPosition] = useState<number | number[]>(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderPosition(newValue);
  };

  // Data to show
  const [selectedData, setSelectedData] = useState(
    (data as any[]).slice(0, 1000)
  );

  useEffect(() => {
    const updateSelectedData = () => {
      const rangeLength = 1000 / zoom;
      const dataLength = (data as any[]).length;
      const dataStart =
        (dataLength - rangeLength) * ((sliderPosition as number) / 100);
      const dataEnd = dataStart + rangeLength;
      setSelectedData((data as any[]).slice(dataStart, dataEnd));
    };

    throttle(updateSelectedData, 100)();
  }, [sliderPosition, zoom]);

  return (
    <ecgContext.Provider
      value={{
        data: selectedData,
        controlsUtils: {
          canIncreaseZoom,
          canReduceZoom,
          increaseZoom,
          reduceZoom,
          sliderPosition,
          handleSliderChange,
        },
      }}
    >
      {children}
    </ecgContext.Provider>
  );
}

export const useEcg = (): EcgContext => useContext(ecgContext);
