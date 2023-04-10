import { Op } from 'sequelize';
import { body, validationResult } from 'express-validator';
import Movie from '../../models/movie';

const movieUpdateValidator = [
    body('title').custom((value, { req }) => {
        const errors = validationResult(req).array();
        const nameIsInvalid = errors.find((e) => e.param === 'title');
        if(nameIsInvalid) {
            return Promise.resolve();
        }
        return Movie.findOne({
            where: {
                title: {
                    [Op.eq]: value
                }
            }
        }).then((result) => {
            const id = req.params?.id;
            if(result && result.id !== parseInt(id)) {
                return Promise.reject(`Movie's title is already register`);
            }
            else {
                return Promise.resolve();
            }
        })
    })
]

export default movieUpdateValidator;