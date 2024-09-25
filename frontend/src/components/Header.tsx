import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Grid,
  Slider,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';

interface HeaderProps {
  seed: number;
  errors: number;
  region: string;
  handleSeedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRandomSeed: () => void;
  handleSliderChange: (newValue: number | number[]) => void;
  handleRegionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleExport: () => void;
}

const Header: React.FC<HeaderProps> = ({
  seed,
  errors,
  region,
  handleSeedChange,
  handleRandomSeed,
  handleSliderChange,
  handleRegionChange,
  handleExport,
}) => {
  return (
    <AppBar
      position="sticky"
      color="default"
      style={{ padding: '20px 0', backgroundColor: '#f9f9f9', zIndex: 1100 }}>
      <Toolbar>
        <Box width="100%">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                label="Seed"
                type="number"
                value={seed}
                onChange={handleSeedChange}
                variant="outlined"
                size="small"
                fullWidth
              />
              <Button
                variant="outlined"
                onClick={handleRandomSeed}
                style={{ marginTop: '10px' }}
                fullWidth>
                Random Seed
              </Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography>Errors: {errors}</Typography>
              <Slider
                value={errors}
                min={0}
                max={10}
                step={0.25}
                onChange={(_, newValue) =>
                  handleSliderChange(newValue as number)
                }
                aria-labelledby="error-slider"
                style={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Region"
                value={region}
                onChange={handleRegionChange}
                variant="outlined"
                fullWidth>
                <MenuItem value="us">USA</MenuItem>
                <MenuItem value="pl">Poland</MenuItem>
                <MenuItem value="uz">Uzbekistan</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleExport}
                style={{ backgroundColor: '#007bff', color: '#fff' }}
                fullWidth>
                Export to CSV
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
