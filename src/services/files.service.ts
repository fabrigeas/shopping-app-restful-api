import { HttpException } from '@exceptions/HttpException';
import fs from 'fs';
import { STATUS_CODES } from '@utils/constants';
import formidable from 'formidable';
import { Request, Response, NextFunction } from 'express';

const IMAGES_BASE_DIR = './images';
const IMAGES_DIR = `${IMAGES_BASE_DIR}/offers`;

class FileService {
  constructor() {
    if (!fs.existsSync(IMAGES_BASE_DIR)) {
      fs.mkdirSync(IMAGES_BASE_DIR);
    }
    if (!fs.existsSync(IMAGES_DIR)) {
      fs.mkdirSync(IMAGES_DIR);
    }
  }

  public uploadFile(req: Request, res: Response, next: NextFunction) {
    const formData = new formidable.IncomingForm();

    formData.parse(req, (_err, _fields, persistentFile) => {
      try {
        const file = persistentFile?.file ?? persistentFile.upfile;
        const { id } = req.params;
        // @ts-expect-error Property originalFilename and filepath does not exist on type 'File | File[]'.
        const { originalFilename, filepath }: string = file;
        const dir = `${IMAGES_DIR}/${id}`;

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }

        fs.copyFile(filepath, `${dir}/${originalFilename}`, error => {
          if (error) {
            return res.status(STATUS_CODES.SERVER_ERROR, error);
          }

          res
            .status(STATUS_CODES.CREATED)
            .json({ originalFilename, message: 'uploaded' });
        });
      } catch (error) {
        next(error);
      }
    });
  }

  public deleteFile(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { filename } = req.headers;
    const dir = `${IMAGES_DIR}/${id}`;

    try {
      if (!fs.existsSync(dir)) {
        res.status(STATUS_CODES.SUCCESS).send(`${dir} Does not exist`);
        return;
      }

      if (filename) {
        const file = `${dir}/${filename}`;
        if (!fs.existsSync(file)) {
          res.status(STATUS_CODES.SUCCESS).send(`${file} Does not exist`);
          return;
        }

        fs.rmSync(file);

        if (fs.readdirSync(dir).length < 1) {
          fs.rmdirSync(dir);
          res
            .status(STATUS_CODES.SUCCESS)
            .send(`Deleted '${dir}' because it is now empty`);
          return;
        }

        res.status(STATUS_CODES.SUCCESS).send(`${file} Deleted`);
      } else {
        fs.rmdirSync(dir, { recursive: true });
        res.status(STATUS_CODES.SUCCESS).send(`${dir} `);
        return;
      }
    } catch (error) {
      next(error);
    }
  }
}

export default FileService;
