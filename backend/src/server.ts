import app from './app';
import { DEFAULT_PORT } from './config/constants';

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, (err?: Error) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
