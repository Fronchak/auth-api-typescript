import { body } from 'express-validator';
import { cleanInput } from '../../utils/string-utils';

const genreInputValidator = [
    body('name').customSanitizer(cleanInput).notEmpty().withMessage(`Genre's name is required and must be non blank`)
]

export default genreInputValidator;