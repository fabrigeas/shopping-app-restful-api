import { NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const FRONTEND_DIR = path.join(__dirname, '../../', 'frontend');

export default class IndexController {
  constructor() {
    if (!fs.existsSync(FRONTEND_DIR)) {
      fs.mkdirSync(FRONTEND_DIR);
    }
  }

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
    } catch (error) {
      next(error);
    }
  };
}
