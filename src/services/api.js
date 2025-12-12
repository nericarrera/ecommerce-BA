import axios from 'axios';
import { toast } from 'react-toastify';

// MockAPI para gatos (ya tienes)
const MOCKAPI_GATOS = 'https://68d6f23ec2a1754b426c4d01.mockapi.io/gatos';

// MockAPI para perros (crea uno nuevo en mockapi.io)
const MOCKAPI_PERROS = 'https://TU_ID_MOCKAPI_PERROS.mockapi.io/perros';

export const apiService = {
  // CRUD Gatos
  async getGatos() {
    try {
      const response = await axios.get(MOCKAPI_GATOS);
      return response.data;
    } catch (error) {
      toast.error('Error al cargar gatos');
      console.error('Error fetching cats:', error);
      return [];
    }
  },

  async createGato(gato) {
    try {
      const response = await axios.post(MOCKAPI_GATOS, gato);
      toast.success('Gato agregado exitosamente');
      return response.data;
    } catch (error) {
      toast.error('Error al agregar gato');
      throw error;
    }
  },

  async updateGato(id, gato) {
    try {
      const response = await axios.put(`${MOCKAPI_GATOS}/${id}`, gato);
      toast.success('Gato actualizado');
      return response.data;
    } catch (error) {
      toast.error('Error al actualizar gato');
      throw error;
    }
  },

  async deleteGato(id) {
    try {
      await axios.delete(`${MOCKAPI_GATOS}/${id}`);
      toast.success('Gato eliminado');
    } catch (error) {
      toast.error('Error al eliminar gato');
      throw error;
    }
  },

  // CRUD Perros (si quieres usar MockAPI en lugar de JSON)
  async getPerros() {
    try {
      const response = await axios.get(MOCKAPI_PERROS);
      return response.data;
    } catch (error) {
      toast.error('Error al cargar perros');
      console.error('Error fetching dogs:', error);
      return [];
    }
  },

  async createPerro(perro) {
    try {
      const response = await axios.post(MOCKAPI_PERROS, perro);
      toast.success('Perro agregado exitosamente');
      return response.data;
    } catch (error) {
      toast.error('Error al agregar perro');
      throw error;
    }
  }
};