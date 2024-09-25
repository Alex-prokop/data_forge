import React from 'react';
import { Box, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

interface DataItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  identifier: string;
}

interface DataDisplayProps {
  data: DataItem[];
  hasMore: boolean;
  fetchMoreData: () => void;
  loaderMarginTop: number;
  boxPadding: number;
}

const DataDisplay: React.FC<DataDisplayProps> = ({
  data,
  hasMore,
  fetchMoreData,
  loaderMarginTop,
  boxPadding,
}) => {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <h4 style={{ textAlign: 'center', marginTop: `${loaderMarginTop}px` }}>
          Loading...
        </h4>
      }>
      {data.map((item, index) => (
        <Box
          key={`${item.identifier}-${index}`}
          padding={boxPadding}
          borderBottom="1px solid #ddd">
          <Typography variant="h6">{item.id}.</Typography>

          <Typography variant="body2">
            <strong>Identifier:</strong> {item.identifier}
          </Typography>

          <Typography variant="body2">
            <strong>Name:</strong> {item.name}
          </Typography>

          <Typography variant="body2">
            <strong>Address:</strong> {item.address}
          </Typography>

          <Typography variant="body2">
            <strong>Phone:</strong> {item.phone}
          </Typography>
        </Box>
      ))}
    </InfiniteScroll>
  );
};

export default DataDisplay;
