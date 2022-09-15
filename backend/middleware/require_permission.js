// noinspection ES6UnusedImports
import User from "../models/user";
import {Request} from 'express';

export const PERMISSION_TYPE_READ = 'read';
export const PERMISSION_EDIT = 'edit';
export const PERMISSION_DELETE = 'delete';

/**
 *
 * @param requiredPermissions Required permissions for this route
 * @param {string} requiredPermissions.entity
 * @param {string} requiredPermissions.permissionType
 * @return {function(Request, Response, function): void}
 */
export default function require_permission(...requiredPermissions) {
    return async function (request, response, next) {
        // noinspection JSUnresolvedVariable
        /**
         * @var {User}
         */
        const user = request.user;

        if (!user && !(requiredPermissions.length === 0)) {
            await forbidden(response)
        }

        // Do not check permissions for admins or if no permissions are required
        if (user.isAdmin || requiredPermissions.length === 0) {
            next();
            return;
        }
        for (const requiredPermission of requiredPermissions) {
            const hasPermission = user.group.permissions.find((permission) =>
                permission.entity === requiredPermission.entity && permission.permissionType === requiredPermission.permissionType
            ) !== undefined;

            // Stop execution if any permission is missing.
            if (!hasPermission) {
                await forbidden(response)
                return;
            }
        }
        next(); // role is allowed, so continue with the next middleware
    }
}

/**
 *
 * @param {Response} response
 * @return {Promise<void>}
 */
async function forbidden(response) {
    response.status = 403;
    await response.json({status: 403, message: "Forbidden"});
}