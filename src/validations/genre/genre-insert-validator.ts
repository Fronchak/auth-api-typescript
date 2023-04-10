import { Op } from 'sequelize';
import { body, validationResult } from 'express-validator';
import Genre from '../../models/genre';

const genreInsertValidator = [
    body('name').custom((value, {req}) => {
        const errors = validationResult(req).array();
        const nameIsInvalid = errors.find((e) => e.param === 'name');
        if(nameIsInvalid) {
            return Promise.resolve();
        }
        return Genre.findOne({
            where: {
                name: {
                    [Op.eq]: value
                }
            }
        }).then((result) => {
            if(result) {
                return Promise.reject(`Genre's name is already register`)
            }
            else {
                return Promise.resolve();
            }
        })
    })
];

export default genreInsertValidator;