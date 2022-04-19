/**
 * Class holds collection of static methods to communicate
 * with server web services to work with 'Kontaktas' entities.
 */
class Kontaktai {
  /**
   * Holds url for web service.
   *
   * @type {string}
   */
  static _urlPart1 = "./rest/zmogus/";
  static _urlPart2 = "/kontaktas/";

  /**
   * Fetches list of all entities belonging to specified parent entity.
   *
   * @param {number} zmogusId - parent entity id
   * @returns {Promise<object[]>} list of entities
   * @throws {TypeError} when zmogusId is not number
   * @throws {Error} when server returns unknown status
   */
  static async getAll(zmogusId) {
    if (typeof zmogusId !== "number") {
      throw new TypeError("zmogusId must be number");
    }
    const res = await fetch(Kontaktai._urlPart1 + zmogusId + Kontaktai._urlPart2);
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(`Unknown status: ${res.statusText} (${res.status})`)
  }

  /**
   * Fetches one entity by id (and parent id).
   * Returns null if not found.
   * 
   * @param {number} zmogusId - parent entity id
   * @param {number} id - entity id
   * @returns {Promise<object|null>}
   * @throws {TypeError} when:
   *    zmogusId is not number;
   *    id is not number;
   * @throws {Error} when:
   *    entity does not belong to parent entity
   *    server returns unknown status
   */
  static async getOne(zmogusId, id) {
    if (typeof zmogusId !== "number") {
      throw new TypeError("zmogusId must be number");
    }
    if (typeof id !== "number") {
      throw new TypeError("id must be number");
    }
    const res = await fetch(Kontaktai._urlPart1 + zmogusId + Kontaktai._urlPart2 + id);
    if (res.status === 200) {
      return res.json();
    }
    if (res.status === 404) {
      return null;
    }
    if (res.status === 409) {
      throw new Error(`Entity with id: ${id} does not belong to specified parent entity (id: ${zmogusId})`);
    }
    throw new Error(`Unknown status: ${res.statusText} (${res.status})`)
  }

  /**
   * Creates new entity.
   *
   * @param {number} zmogusId - parent entity id
   * @param {object} kontaktas - entity to be created
   * @returns {Promise<object>} newly created entity
   * @throws {TypeError} when:
   *    zmogusId is not number;
   *    parameter is not object
   * @throws {Error} when server returns unknown status;
   */
  static async create(zmogusId, kontaktas) {
    if (typeof zmogusId !== "number") {
      throw new TypeError("zmogusId must be number");
    }
    if (typeof kontaktas !=="object" || kontaktas === null) {
      throw new TypeError("zmogus must be object");
    }
    const res = await fetch(Kontaktai._urlPart1 + zmogusId + Kontaktai._urlPart2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(kontaktas)
    });
    if (res.status === 201) {
      return res.json();
    }
    throw new Error(`Unknown status: ${res.statusText} (${res.status})`)
  }

  /**
   * Updates provided entity.
   *
   * @param {number} zmogusId - parent entity id
   * @param {object} kontaktas - entity to be updated
   * @returns {Promise<object|null>} - updated entity
   *    or null if entity was not found on server
   * @throws {TypeError} when:
   *    zmogusId is not number;
   *    parameter is not object;
   *    property id is not number;
   * @throws {Error} when:
   *    entity does not belong to parent entity
   *    server returns unknown status
   */
  static async update(zmogusId, kontaktas) {
    if (typeof zmogusId !== "number") {
      throw new TypeError("zmogusId must be number");
    }
    if (typeof kontaktas !=="object" || kontaktas === null) {
      throw new TypeError("zmogus must be object");
    }
    if (typeof kontaktas.id !== "number") {
      throw new TypeError("kontaktas.id must be number");
    }
    const res = await fetch(Kontaktai._urlPart1 + zmogusId + Kontaktai._urlPart2 + kontaktas.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(kontaktas)
    });
    if (res.status === 200) {
      return res.json();
    }
    if (res.status === 404) {
      return null;
    }
    if (res.status === 409) {
      throw new Error(`Entity with id: ${kontaktas.id} does not belong to specified parent entity (id: ${zmogusId})`);
    }
    throw new Error(`Unknown status: ${res.statusText} (${res.status})`)
  }

  /**
   * Deletes entity by specified id.
   *
   * @param {number} zmogusId - parent entity id
   * @param {number} id - entity id
   * @returns {Promise<boolean>} true - entity was deleted;
   *    false - entity was not found
   * @throws {TypeError} when:
   *    zmogusId is not number;
   *    id is not number;
   * @throws {Error} when:
   *    entity does not belong to parent entity
   *    server returns unknown status
   */
  static async delete(zmogusId, id) {
    if (typeof id !== "number") {
      throw new TypeError("id must be number");
    }
    const res = await fetch(Kontaktai._urlPart1 + zmogusId + Kontaktai._urlPart2 + id, {
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
  Kontaktai
};
