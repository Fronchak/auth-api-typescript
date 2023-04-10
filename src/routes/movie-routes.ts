import { Router } from 'express';
import resolver from './controller-adapter';
import movieController from '../controllers/movie-controller';
import checkIdParam from '../middlewares/check-id-param';
import movieInputValidator from '../validations/movie/movie-input-validator';
import checkValidationErrors from '../middlewares/check-validation-errors';
import movieInsertValidator from '../validations/movie/movie-insert-validator';
import movieUpdateValidator from '../validations/movie/movie-update-validator';
import checkToken from '../middlewares/check-token';
import checkRolesAdminOrEditor from '../middlewares/check-roles-admin-or-editor';
import checkRoleAdmin from '../middlewares/check-role-admin';

const movieRoutes: Router = Router();

movieRoutes.post('/', 
                checkToken,
                checkRolesAdminOrEditor,
                movieInputValidator, 
                movieInsertValidator,
                checkValidationErrors,
                resolver(movieController.save));
movieRoutes.get('/', resolver(movieController.findAll));
movieRoutes.get('/:id', checkToken, checkIdParam, resolver(movieController.findById));
movieRoutes.put('/:id', 
                checkToken,
                checkRolesAdminOrEditor,
                checkIdParam, 
                movieInputValidator, 
                movieUpdateValidator,
                checkValidationErrors,
                resolver(movieController.update));
movieRoutes.delete('/:id', 
                checkToken,
                checkRoleAdmin,
                checkIdParam, 
                resolver(movieController.delete));

export default movieRoutes;