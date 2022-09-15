import Model from "./model";

export default class Group extends Model {
    #name;
    #permissions;

    /**
     * @param {int} id
     * @param {name} name
     * @param {GroupPermission[]} permissions
     */
    constructor(id, name, permissions) {
        super(id);
        this.#name = name;
        this.#permissions = permissions;
    }

    /**
     * @return {string}
     */
    get name() {
        return this.#name;
    }

    /**
     * @param {string} name
     */
    set name(name) {
        this.#name = name;
    }

    /**
     * @return {GroupPermission[]}
     */
    get permissions() {
        return this.#permissions;
    }

    /**
     * @param {GroupPermission[]} permissions
     */
    set permissions(permissions) {
        this.#permissions = permissions
    }


}