export default class Model {
    #id;

    /**
     * @param {int} id
     */
    constructor(id) {
        this.#id = id;
    }

    /**
     * @return {int}
     */
    get id() {
        return this.#id;
    }
}