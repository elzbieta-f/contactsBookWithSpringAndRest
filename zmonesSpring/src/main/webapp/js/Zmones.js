/**
 * Class holds collection of static methods to communicate
 * with server web services to work with 'Zmogus' entities.
 */
class Zmones {
  /**
   * Holds url for web service.
   *
   * @type {string}
   */
  static _url = "./rest/zmogus/";

  /**
   * Fetches list of all entities.
   *
   * @returns {Promise<object[]>} list of entities
   * @throws {Error} when server returns unknown status
   */
  static async getAll(filter) {
    const res = await fetch(Zmones._url+((filter)?"?filter="+filter:""));
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(`Unknown status: ${res.statusText} (${res.status})`)
  }

  /**
   * Fetches one entity by id.
   * Returns null if not found.
   * 
   * @param {number} id - entity id
   * @returns {Promise<object|null>}
   * @throws {TypeError} when id is not number
   * @throws {Error} when server returns unknown status
   */
  static async getOne(id) {
    if (typeof id !== "number") {
      throw new TypeError("id must be number");
    }
    const res = await fetch(Zmones._url + id);
    if (res.status === 200) {
      return res.json();
    }
    if (res.status === 404) {
      return null;
    }
    throw new Error(`Unknown status: ${res.statusText} (${res.status})`)
  }

  /**
   * Creates new entity.
   *
   * @param {object} zmogus - entity to be created
   * @returns {Promise<object>} newly created entity
   * @throws {TypeError} when parameter is not object
   * @throws {Error} when server returns unknown status;
   */
  static async create(zmogus) {
    if (typeof zmogus !=="object" || zmogus === null) {
      throw new TypeError("zmogus must be object");
    }
    const res = await fetch(Zmones._url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(zmogus)
    });
    if (res.status === 201) {
      return res.json();
    }
    throw new Error(`Unknown status: ${res.statusText} (${res.status})`)
  }

  /**
   * Updates provided entity.
   *
   * @param {object} zmogus - entity to be updated
   * @returns {Promise<object|null>} - updated entity
   *    or null if entity was not found on server
   * @throws {TypeError} when:
   *    parameter is not object;
   *    property id is not number;
   * @throws {Error} when server returns unknown status
   */
  static async update(zmogus) {
    if (typeof zmogus !=="object" || zmogus === null) {
      throw new TypeError("zmogus must be object");
    }
    if (typeof zmogus.id !== "number") {
      throw new TypeError("zmogus.id must be number");
    }
    const res = await fetch(Zmones._url + zmogus.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(zmogus)
    });
    if (res.status === 200) {
      return res.json();
    }
    if (res.status === 404) {
      return null;
    }
    throw new Error(`Unknown status: ${res.statusText} (${res.status})`)
  }

  /**
   * Deletes entity by specified id.
   *
   * @param {number} id - entity id
   * @returns {Promise<boolean>} true - entity was deleted;
   *    false - entity was not found
   * @throws {TypeError} when id is not number;
   * @throws {Error} when server returns unknown status
   */
  static async delete(id) {
    if (typeof id !== "number") {
      throw new TypeError("id must be number");
    }
    const res = await fetch(Zmones._url + id, {
      method: "DELETE"
    });
    if (res.status === 200) {
      return true;
    }
    if (res.status === 404) {
      return false;
    }
    throw new Error(`Unknown status: ${res.statusText} (${res.status})`)
  }
}

export {
  Zmones
};
