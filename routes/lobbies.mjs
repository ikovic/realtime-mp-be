import express from 'express';
import validateTokenInMemory from '../middleware/validateTokenInMemory';

const router = express.Router();

router.get('/', validateTokenInMemory, (req, res) => {
  res.json([
    {
      id: 1,
      name: 'xtreme lobby',
      players: 0,
      maxPlayers: 5,
    },
    {
      id: 2,
      name: 'huge lobby',
      players: 2,
      maxPlayers: 120,
    },
    {
      id: 3,
      name: 'pls join my lobby',
      players: 1,
      maxPlayers: 5,
    },
    {
      id: 4,
      name: 'we r full',
      players: 7,
      maxPlayers: 7,
    },
  ]);
});

export default router;
