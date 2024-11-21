export default class TOTPSecretRepository {
    db = {};

    set = (key, value) => {
        if (this.db[key] !== undefined) {
            return false;
        }

        this.db[key] = value;
        return true;
    };

    get = (key) => {
        if (this.db[key] === undefined) {
            return false;
        }

        return this.db[key];
    };

    delete = (key) => {
        delete this.db[key];
    };
}
