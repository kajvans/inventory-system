import Model from "./model";

export default class GroupPermission extends Model {
    #entity;
    #group;
    #permissionType

    /**
     * @param {int} id
     * @param {string} entity
     * @param {string} permissionType
     * @param {Group} group
     */
    constructor(id, entity, permissionType, group) {
        super(id);
        this.#entity = entity;
        this.#permissionType = permissionType;
        this.#group = group;
    }

    set entity(entity) {
        this.#entity = entity;
    }

    get entity() {
        return this.#entity
    }

    set group(group) {
        this.#group = group;
    }

    get group() {
        return this.#group;
    }

    set permissionType(type) {
        this.#permissionType = type;
    }

    get permissionType() {
        return this.#permissionType
    }
}