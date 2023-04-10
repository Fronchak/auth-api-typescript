import checkRoles from "./check-roles";

const checkRolesAdminOrEditor = checkRoles('ROLE_EDITOR', 'ROLE_ADMIN');

export default checkRolesAdminOrEditor;