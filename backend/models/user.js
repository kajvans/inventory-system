import Group from "./group";
import Model from "./model";

export default class User extends Model {
    #password;
    #isAdmin;
    #groupId;
    #group;

    /**
     *
     * @param {int} id
     * @param {string} password
     * @param {boolean} isAdmin
     * @param {int} groupId
     * @param {Group} group
     */
    constructor(id, password, isAdmin, groupId, group) {
        super(id);
        this.#password = password;
        this.#isAdmin = isAdmin;
        this.#groupId = groupId;
        this.#group = group;
    }

    /**
     * @param {string} password
     */
    set password(password) {
        this.#password = password;
    }

    /**
     * @return {string}
     */
    get password() {
        return this.#password;
    }

    set isAdmin(isAdmin) {
        this.#isAdmin = isAdmin;
    }

    /**
     * @return {boolean}
     */
    get isAdmin() {
        return this.#isAdmin;
    }

    /**
     * @return {int}
     */
    get groupId() {
        return this.#groupId;
    }

    /**
     * @return {Group}
     */
    get group() {
        return this.#group;
    }

    /**
     * @param {Group} group
     */
    set group(group) {
        this.#group = group;
        this.#groupId = group.id;
    }
}