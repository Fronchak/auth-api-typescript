import { Router } from 'express';
import genreController from '../controllers/genre-controller';
import resolver from './controller-adapter';
import checkIdParam from '../middlewares/check-id-param';
import genreInputValidator from '../validations/genre/genre-input-validator';
import checkValidationErrors from '../middlewares/check-validation-errors';
import genreInsertValidator from '../validations/genre/genre-insert-validator';
import genreUpdateValidator from '../validations/genre/genre-update-validator';
import checkToken from '../middlewares/check-token';
import checkRoleAdmin from '../middlewares/check-role-admin';
import checkRolesAdminOrEditor from '../middlewares/check-roles-admin-or-editor';

const genreRoutes: Router = Router();

genreRoutes.post('/', 
                checkToken,
                checkRolesAdminOrEditor,
                genreInputValidator, 
                genreInsertValidator, 
                checkValidationErrors, 
                resolver(genreController.save));
genreRoutes.get('/', resolver(genreController.findAll))
genreRoutes.get('/:id', checkToken, checkIdParam, resolver(genreController.findById));
genreRoutes.put('/:id', 
                checkToken,
                checkRolesAdminOrEditor,
                checkIdParam, 
                genreInputValidator, 
                genreUpdateValidator, 
                checkValidationErrors, 
                resolver(genreController.update));
genreRoutes.delete('/:id', 
                checkToken,
                checkRoleAdmin,
                checkIdParam, 
                resolver(genreController.delete));

export default genreRoutes;