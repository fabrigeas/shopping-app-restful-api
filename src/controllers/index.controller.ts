import { NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const PUBLIC_DIR = path.join(__dirname, '../../', 'public');

export default class IndexController {
  constructor() {
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR);
    }
  }

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
    } catch (error) {
      next(error);
    }
  };
}
