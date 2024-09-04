import { colorsModel } from '../models/colorsModel.js';

export const colorsController = {

  async createColor(req, res) {
    try {
      const validationResult = await colorsModel.validateSchema(req.body);
      if (validationResult?.error) {
        return res.status(400).json({ error: validationError(validationResult.error)});
      }

      const existingColor = await colorsModel.get({ user_id: req.body.user_id });  

      if (existingColor) {
        return res.status(409).json({ error: 'Color with this ID already exists' });
      }

      let credentials = { ...req.body, ...initData.color };
      const newColor = await colorsModel.add(credentials);
      res.status(201).json(newColor);
    } catch (error) {
      res.status(400).json({ error: `Color creation failed: ${error.message}` });
    }
  },

  async getAllColors(req, res) {
    try {
      // Get all Colors from the database
      const allColors = await colorsModel.getAll({}, {}, {});

      res.status(200).json(allColors);
    } catch (error) {
      res.status(500).json({ error: 'Get all Colors failed: Internal Server Error' });
    }
  },

  async getColor(req, res) {
    try {
      const colorId = req.params.id;
      const color = await colorsModel.get(colorId, {});

      if (!color) {
        return res.status(404).json({ error: 'Color not found' });
      }

      res.status(200).json(color);
    } catch (error) {
      res.status(500).json({ error: 'Get Color failed: Internal Server Error' });
    }
  },

  async updateColor(req, res) {
    try {
      const colorId = req.params.id;
      
      const validationResult = await colorsModel.validateSchema(req.body);
      if (validationResult?.error) {
        return res.status(400).json({ error: validationError(validationResult.error)});
      }

      const updatedColor = await colorsModel.updateOne(colorId, {...req.body, update_date: now});

      if (!updatedColor) {
        return res.status(404).json({ error: 'Color not found' });
      }

      res.status(200).json(updatedColor);
    } catch (error) {
      res.status(500).json({ error: 'Update Color failed: Internal Server Error' });
    }
  },

  async deleteColor(req, res) {
    try {
      const colorId = req.params.id;
      const deleteColor = await colorsModel.delete(colorId);

      if (!deleteColor) {
        return res.status(404).json({ error: 'Color not found' });
      }

      res.status(200).json(deleteColor);
    } catch (error) {
      res.status(500).json({ error: 'Delete Color failed: Internal Server Error' });
    }
  },

  async updateColorAttribute(req, res) {
    try {
      const colorId = req.params.id;
      const { attr, value} = req.body;

      const updatedColor = await colorsModel.findOneAndUpdate(
        colorId,
        { $set: { [attr]: value, update_date: now} },
        { returnDocument: 'after' },
        {}
      );
      
      if (!updatedColor) {
        return res.status(404).json({ error: 'Color not found' });
      }

      res.status(200).json(updatedColor);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}