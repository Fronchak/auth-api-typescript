import { body } from 'express-validator';
import { cleanInput } from '../../utils/string-utils';

const movieInputValidator = [
    body('title').customSanitizer(cleanInput).notEmpty().withMessage(`Movie's title is required and must be non blank`),
    body('synopsis').customSanitizer(cleanInput).notEmpty().withMessage(`Movie's synopsis is required and must be non blank`),
    body('genreIds').custom((value) => {
        if(!Array.isArray(value)) {
            throw new Error('genreIds must be an array of numbers');
        }
        if(value.length === 0) {
            throw new Error('Movie should have at least one genre');
        }
        value.forEach((id) => {
            if(Number.isNaN(parseInt(id))) {
                throw new Error('genreIds must be an array of numbers')
            }
        });
        return true;
    })
]

export default movieInputValidator;