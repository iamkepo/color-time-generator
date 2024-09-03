import { ObjectId } from 'mongodb';
import { getTab } from './dbService.js';

/**
 * Classe représentant un contrôleur de base de données pour une collection MongoDB spécifique.
 */
class RequestService {
  /**
   * Constructeur de la classe.
   * @param {string} collectionName - Le nom de la collection MongoDB à manipuler.
   */
  constructor(collectionName) {
    this.collection = getTab[collectionName];
  }

  
  /**
   * Ajoute un nouveau document à la collection.
   * @param {Object} data - Les données à ajouter à la collection.
   * @returns {Object} - Le document ajouté.
   */
  async add(data) {
    const result = await this.collection.insertOne(data);
    return result;
  }
  
  /**
   * Ajoute plusieurs documents à la collection.
   * @param {Array} dataArray - Un tableau de données à ajouter à la collection.
   * @returns {Array} - Un tableau des documents ajoutés.
   */
  async addMany(dataArray) {
    // Utilise la méthode insertMany pour ajouter plusieurs documents à la collection
    const result = await this.collection.insertMany(dataArray);

    // Renvoie les documents insérés (result.ops est un tableau de documents insérés)
    return result.ops;
  }

  /**
   * Met à jour un document existant dans la collection.
   * @param {string} id - L'ID du document à mettre à jour.
   * @param {Object} data - Les données à mettre à jour.
   * @returns {boolean} - Indique si la mise à jour a réussi.
   */
  async update(id, data) {
    const result = await this.collection.updateOne({ _id: ObjectId(id) }, { $set: data });
    return result.modifiedCount > 0;
  }

  /**
   * Met à jour plusieurs documents de la collection en fonction du filtre.
   * @param {Object} filter - Le filtre pour la mise à jour.
   * @param {Object} update - Les modifications à apporter aux documents correspondants.
   * @returns {number} - Le nombre de documents mis à jour.
   */
  async updateMany(filter, update) {
    // Utilise la méthode updateMany pour mettre à jour plusieurs documents de la collection
    const result = await this.collection.updateMany(filter, update);

    // Renvoie le nombre de documents mis à jour
    return result.modifiedCount;
  }


  /**
   * Supprime un document de la collection en fonction de son ID.
   * @param {string} id - L'ID du document à supprimer.
   * @returns {boolean} - Indique si la suppression a réussi.
   */
  async delete(id) {
    const result = await this.collection.deleteOne({ _id: ObjectId(id) });
    return result.deletedCount > 0;
  }

  /**
   * Supprime plusieurs documents de la collection en fonction du filtre.
   * @param {Object} filter - Le filtre pour la suppression.
   * @returns {number} - Le nombre de documents supprimés.
   */
  async deleteMany(filter) {
    // Utilise la méthode deleteMany pour supprimer plusieurs documents de la collection
    const result = await this.collection.deleteMany(filter);

    // Renvoie le nombre de documents supprimés
    return result.deletedCount;
  }

  /**
   * Récupère un document de la collection en fonction de son ID.
   * @param {string} id - L'ID du document à récupérer.
   * @param {Object} projection - La projection pour inclure ou exclure des champs spécifiques.
   * @returns {Object} - Le document récupéré.
   */
  async get(id, projection = {}) {
    const result = await this.collection.findOne({ _id: ObjectId(id) }, { projection });
    return result;
  }

  /**
   * Récupère plusieurs documents de la collection avec un filtre et des options spécifiques.
   * @param {Object} filter - Le filtre pour la requête.
   * @param {Object} options - Les options pour la requête (tri, limite, etc.).
   * @param {Object} projection - La projection pour inclure ou exclure des champs spécifiques.
   * @returns {Array} - Un tableau de documents correspondant aux critères.
   */
  async getAll(filter = {}, options = {}, projection = {}) {
    const result = await this.collection.find(filter, options).toArray();
    return result;
  }

  /**
   * Retrieve documents from the collection, sorted by date.
   * @param {Object} filter - Le filtre pour la requête.
   * @param {string} dateField - The field used for date comparison.
   * @param {Object} projection - La projection pour inclure ou exclure des champs spécifiques.
   * @param {string} sortOrder - The sort order ('asc' for ascending, 'desc' for descending).
   * @returns {Array} - An array of documents sorted by date.
   */
  async getSortedByDate(filter = {}, dateField, projection = {}, sortOrder = 'asc') {
    const sortOptions = { [dateField]: sortOrder === 'asc' ? 1 : -1 };
    const result = await this.collection.find(filter).sort(sortOptions).project(projection).toArray();
    return result;
  }
  
  /**
   * Récupère le nombre de documents correspondant à un filtre donné.
   * @param {Object} filter - Le filtre pour la requête.
   * @returns {number} - Le nombre de documents correspondant au filtre.
   */
  async getCount(filter = {}) {
    const count = await this.collection.countDocuments(filter);
    return count;
  }

  /**
   * Effectue une opération d'agrégation MongoDB.
   * @param {Array} pipeline - Le pipeline d'opérations d'agrégation.
   * @returns {Array} - Le résultat de l'opération d'agrégation.
   */
  async aggregate(pipeline) {
    const result = await this.collection.aggregate(pipeline).toArray();
    return result;
  }

  /**
   * Récupère plusieurs documents de la collection avec un filtre et les trie en fonction des options spécifiées.
   * @param {Object} filter - Le filtre pour la requête.
   * @param {Object} sortOptions - Les options de tri.
   * @param {Object} projection - La projection pour inclure ou exclure des champs spécifiques.
   * @returns {Array} - Un tableau de documents triés correspondant aux critères.
   */
  async findAndSort(filter = {}, sortOptions = {}, projection = {}) {
    const result = await this.collection.find(filter).sort(sortOptions).project(projection).toArray();
    return result;
  }

  /**
   * Recherche un document et le met à jour atomiquement.
   * @param {Object} filter - Le filtre pour la recherche.
   * @param {Object} update - Les modifications à apporter au document trouvé.
   * @param {Object} options - Les options de recherche et de mise à jour.
   * @param {Object} projection - La projection pour inclure ou exclure des champs spécifiques.
   * @returns {Object} - Le document avant la mise à jour.
   */
  async findAndUpdate(filter, update, options = {}, projection = {}) {
    const result = await this.collection.findOneAndUpdate(filter, update, { ...options, projection });
    return result.value;
  }

  /**
   * Recherche un document avec un filtre donné.
   * @param {Object} filter - Le filtre pour la recherche.
   * @param {Object} projection - La projection pour inclure ou exclure des champs spécifiques.
   * @returns {Object} - Le premier document correspondant au filtre.
   */
  async getOne(filter, projection = {}) {
    const result = await this.collection.findOne(filter, { projection });
    return result;
  }

  /**
   * Récupère des valeurs distinctes pour un champ donné avec un filtre donné.
   * @param {string} fieldName - Le nom du champ pour lequel récupérer des valeurs distinctes.
   * @param {Object} filter - Le filtre pour la recherche.
   * @returns {Array} - Un tableau de valeurs distinctes pour le champ spécifié.
   */
  async distinct(fieldName, filter = {}) {
    const result = await this.collection.distinct(fieldName, filter);
    return result;
  }

  /**
   * Récupère le dernier élément de la collection en se basant sur le champ de date.
   * @param {Object} filter - Le filtre pour la recherche.
   * @param {Object} projection - La projection pour inclure ou exclure des champs spécifiques.
   * @param {string} dateField - Le champ utilisé pour trier les documents par date.
   * @returns {Object} - Le dernier élément de la collection.
   */
  async getLastElementByDate(filter, dateField, projection = {}) {
    // Utilise la méthode findOne pour récupérer le dernier élément trié par date descendant
    const lastElement = await this.collection.findOne(filter, { sort: { [dateField]: -1 } }, { projection });
    return lastElement;
  }

}

export default RequestService;
