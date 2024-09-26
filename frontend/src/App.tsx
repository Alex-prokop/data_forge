import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import Header from './components/Header';
import DataDisplay from './components/DataDisplay';
import {
  INITIAL_PAGE,
  INITIAL_SEED,
  RANDOM_SEED_MAX,
  INITIAL_ERRORS,
  DEFAULT_REGION,
  INITIAL_HAS_MORE,
  INITIAL_LOAD_COUNT,
  SCROLL_LOAD_COUNT,
  API_BASE_URL,
} from './constants';

interface DataItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  identifier: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  const [seed, setSeed] = useState<number>(INITIAL_SEED);
  const [errors, setErrors] = useState<number>(INITIAL_ERRORS);
  const [region, setRegion] = useState<string>(DEFAULT_REGION);
  const [hasMore, setHasMore] = useState<boolean>(INITIAL_HAS_MORE);

  const fetchData = async (pageToLoad: number, reset = false) => {
    try {
      const isInitialLoad = pageToLoad === INITIAL_PAGE;
      const response = await axios.get<{ data: DataItem[] }>(
        `${API_BASE_URL}/data`,
        {
          params: {
            seed,
            page: pageToLoad,
            errors,
            region,
            isInitialLoad,
          },
        }
      );

      if (reset) {
        setData(response.data.data);
      } else {
        setData((prevData) => [...prevData, ...response.data.data]);
      }

      if (
        (isInitialLoad && response.data.data.length < INITIAL_LOAD_COUNT) ||
        (!isInitialLoad && response.data.data.length < SCROLL_LOAD_COUNT)
      ) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setPage(INITIAL_PAGE);
    setHasMore(INITIAL_HAS_MORE);
    fetchData(INITIAL_PAGE, true);
  }, [seed, errors, region]);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSeed(Number(event.target.value));

  const handleRandomSeed = () =>
    setSeed(Math.floor(Math.random() * RANDOM_SEED_MAX));

  const handleSliderChange = (newValue: number | number[] | undefined) => {
    if (newValue !== undefined) {
      setErrors(newValue as number);
    }
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRegion(event.target.value);

  const handleExport = () => {
    window.open(
      `${API_BASE_URL}/export?seed=${seed}&page=${page}&errors=${errors}&region=${region}`
    );
  };

  return (
    <>
      <Header
        seed={seed}
        errors={errors}
        region={region}
        handleSeedChange={handleSeedChange}
        handleRandomSeed={handleRandomSeed}
        handleSliderChange={handleSliderChange}
        handleRegionChange={handleRegionChange}
        handleExport={handleExport}
      />

      <Container maxWidth="md" style={{ marginTop: '50px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Fake data generator
        </Typography>

        <DataDisplay
          data={data}
          hasMore={hasMore}
          fetchMoreData={fetchMoreData}
          loaderMarginTop={20}
          boxPadding={2}
        />
      </Container>
    </>
  );
};

export default App;
