import colorSchema from '../configs/schemas/colorSchema.js';
import RequestService from '../configs/services/requestService.js';

class ColorsModel extends RequestService {
  constructor() {
    super('colors');
  }

  /**
   * Ajoute un nouveau document à la collection.
   * @param {Object} data - Les données à ajouter à la collection.
   */
  async validateSchema(data) {
    const validationResult = colorSchema.validate(data)
    return validationResult;
  }

  generateColorFromHours(hours) {
    // Limiter les heures au nombre total de couleurs possibles
    const limitedHours = hours % 16777216; // 16 777 216 = 256 * 256 * 256
  
    // Calcul des composantes R, G, B
    const r = Math.floor(limitedHours / (256 * 256)) % 256;
    const g = Math.floor(limitedHours / 256) % 256;
    const b = limitedHours % 256;
    
    // Alpha est fixé à 1
    const a = 1;
  
    // Construction de la couleur RGBA
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  
  getHoursSinceEpoch(date) {
    // Temps en millisecondes depuis l'époque (1er janvier 1970)
    const millisecondsSinceEpoch = date.getTime();
    
    // Convertir les millisecondes en heures
    const hoursSinceEpoch = Math.floor(millisecondsSinceEpoch / (1000 * 60 * 60));
    
    return hoursSinceEpoch;
  }
  
  getDateFromRGB(r, g, b) {
    // Calculer le nombre d'heures à partir des composantes RGB
    const hours = (r * 256 * 256) + (g * 256) + b;
  
    // Convertir les heures en millisecondes
    const milliseconds = hours * 60 * 60 * 1000;
  
    // Créer une date à partir de l'époque (1er janvier 1970)
    const date = new Date(milliseconds);
  
    return date;
  }

  async getColorsCount() {
    const count = await this.getCount({});
    return count;
  }
}
export const colorsModel = new ColorsModel();