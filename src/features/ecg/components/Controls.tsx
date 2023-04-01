import { Button, Grid } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useEcg } from '../context';

export function Controls() {
  const {
    controlsUtils: {
      canIncreaseZoom,
      canReduceZoom,
      increaseZoom,
      reduceZoom,
      sliderPosition,
      handleSliderChange,
    },
  } = useEcg();

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      position="absolute"
      bottom="24px"
      paddingX="40px"
      alignItems="center"
    >
      <Grid item container xs={2} spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            onClick={reduceZoom}
            disabled={!canReduceZoom}
          >
            -
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={increaseZoom}
            disabled={!canIncreaseZoom}
          >
            +
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Slider
          onChange={handleSliderChange}
          step={0.01}
          value={sliderPosition}
        />
      </Grid>
    </Grid>
  );
}
