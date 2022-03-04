import {HttpException, HttpStatus} from "@nestjs/common";
import {extname} from 'path';

export const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(png|jpeg|jpg|pdf|mp4)$/)) {
        return callback(
            new HttpException(
                'Only PNG, JPG, PDF and MP4 are allowed',
                HttpStatus.BAD_REQUEST
            ),
            false
        );
    }
    callback(null, true);
}

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname)
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 10).toString())
        .join('');
    callback(null, `${name}${randomName}${fileExtName}`);
}
