import express from 'express';
import cors from 'cors';
import v1Routes from './routes/api/v1';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json());
app.use(v1Routes);

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/* eslint-disable-next-line */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
    },
  });
});

/* eslint-disable-next-line */
app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));
export default app;
