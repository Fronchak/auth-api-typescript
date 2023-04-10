import { Op } from 'sequelize';
import Genre from '../../models/genre';
import { body, validationResult } from 'express-validator';

const genreUpdateValidator = [
    body('name').custom((value, { req }) => {
        const errors = validationResult(req).array();
        const nameIsValid = errors.find((e) => e.param === 'name');
        if(nameIsValid) {
            return Promise.resolve();
        }
        return Genre.findOne({
            where: {
                name: {
                    [Op.eq]: value
                }
            }
        }).then((result) => {
            const id = req.params?.id;
            if(result && result.id !== parseInt(id)) {
                return Promise.reject(`Genre's name is already register`)
            }
            else {
                return Promise.resolve();
            }
        })
    })
];

export default genreUpdateValidator;