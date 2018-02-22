import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Itis up');
});

export default router;
