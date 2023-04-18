import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => res.status(404)
  .json({ result: 'error', msg: 'Not Found' });

export default notFound;
