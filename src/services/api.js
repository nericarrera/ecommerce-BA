// services/api.js - API SERVICE PROFESIONAL PARA PRODUCCIÓN
import axios from 'axios';
import { toast } from 'react-toastify';

// Configuración de axios para producción
const apiClient = axios.create({
  timeout: 10000, // 10 segundos timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Endpoints de MockAPI (REEMPLAZA CON TUS URLs REALES)
const API_ENDPOINTS = {
  GATOS: 'https://68d6f23ec2a1754b426c4d01.mockapi.io/gatos',
  PERROS: 'https://TU_ID.mockapi.io/perros', // ¡CREA ESTE ENDPOINT!
  PRODUCTOS: 'https://TU_ID.mockapi.io/productos' // Para CRUD general
};

// Datos de respaldo (fallback) para producción
const FALLBACK_DATA = {
  GATOS: [
    {
      id: "1",
      nombre: "Michi",
      descripcion: "Gato juguetón y cariñoso en busca de hogar",
      precio: 1500,
      imagen: "https://images.unsplash.com/photo-1514888286974-6d03bdeacba8?w=300&h=200&fit=crop",
      categoria: "gatos",
      edad: "2 años",
      raza: "Mestizo"
    },
    {
      id: "2",
      nombre: "Luna",
      descripcion: "Gata tranquila ideal para apartamento",
      precio: 1800,
      imagen: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=300&h=200&fit=crop",
      categoria: "gatos",
      edad: "3 años",
      raza: "Siamés"
    },
    {
      id: "3",
      nombre: "Simba",
      descripcion: "Gato activo que adora jugar y explorar",
      precio: 2000,
      imagen: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&h=200&fit=crop",
      categoria: "gatos",
      edad: "1 año",
      raza: "Atigrado"
    }
  ],
  PERROS: [
    {
      id: "1",
      nombre: "Rocket",
      descripcion: "Perro energético y leal, perfecto para actividades al aire libre",
      precio: 2500,
      imagen: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop",
      categoria: "perros",
      edad: "3 años",
      raza: "Labrador"
    },
    {
      id: "2",
      nombre: "Bella",
      descripcion: "Perrita dulce y tranquila, se lleva bien con niños",
      precio: 2200,
      imagen: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=300&h=200&fit=crop",
      categoria: "perros",
      edad: "4 años",
      raza: "Golden Retriever"
    }
  ]
};

// Interceptor para manejo global de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error de API:', error);
    
    // Mostrar error apropiado según el tipo
    if (error.code === 'ECONNABORTED') {
      toast.error('Tiempo de espera agotado. Intenta nuevamente.');
    } else if (!error.response) {
      toast.error('Error de conexión. Verifica tu internet.');
    } else if (error.response.status === 404) {
      toast.error('Recurso no encontrado.');
    } else if (error.response.status >= 500) {
      toast.error('Error del servidor. Intenta más tarde.');
    } else {
      toast.error('Error inesperado.');
    }
    
    return Promise.reject(error);
  }
);

export const apiService = {
  // ========== GATOS ==========
  async getGatos() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GATOS);
      return response.data;
    } catch {
      console.warn('Usando datos de respaldo para gatos');
      return FALLBACK_DATA.GATOS;
    }
  },

  async getGatoById(id) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.GATOS}/${id}`);
      return response.data;
    } catch {
      console.warn('Gato no encontrado, retornando primer gato de respaldo');
      return FALLBACK_DATA.GATOS[0];
    }
  },

  async createGato(gatoData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.GATOS, gatoData);
      toast.success('Gato agregado exitosamente');
      return response.data;
    } catch (error) {
      toast.error('Error al crear gato');
      throw error;
    }
  },

  async updateGato(id, gatoData) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.GATOS}/${id}`, gatoData);
      toast.success('Gato actualizado');
      return response.data;
    } catch (error) {
      toast.error('Error al actualizar gato');
      throw error;
    }
  },

  async deleteGato(id) {
    try {
      await apiClient.delete(`${API_ENDPOINTS.GATOS}/${id}`);
      toast.success('Gato eliminado');
      return { success: true };
    } catch (error) {
      toast.error('Error al eliminar gato');
      throw error;
    }
  },

  // ========== PERROS ==========
  async getPerros() {
    try {
      // Si tienes endpoint para perros, úsalo. Sino, retorna datos locales
      if (API_ENDPOINTS.PERROS.includes('TU_ID')) {
        console.log('Usando datos locales para perros');
        return FALLBACK_DATA.PERROS;
      }
      const response = await apiClient.get(API_ENDPOINTS.PERROS);
      return response.data;
    } catch {
      console.warn('Usando datos de respaldo para perros');
      return FALLBACK_DATA.PERROS;
    }
  },

  async getPerroById(id) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PERROS}/${id}`);
      return response.data;
    } catch {
      console.warn('Perro no encontrado, retornando primer perro de respaldo');
      return FALLBACK_DATA.PERROS[0];
    }
  },

  // ========== CRUD GENERAL (Requerimiento #2) ==========
  async getProductos() {
    try {
      if (API_ENDPOINTS.PRODUCTOS.includes('TU_ID')) {
        // Combinar gatos y perros como productos
        const gatos = await this.getGatos();
        const perros = await this.getPerros();
        return [...gatos, ...perros];
      }
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTOS);
      return response.data;
    } catch {
      console.warn('Usando datos combinados de respaldo');
      return [...FALLBACK_DATA.GATOS, ...FALLBACK_DATA.PERROS];
    }
  },

  async createProducto(productoData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PRODUCTOS, productoData);
      toast.success('Producto creado exitosamente');
      return response.data;
    } catch (error) {
      toast.error('Error al crear producto');
      throw error;
    }
  },

  async updateProducto(id, productoData) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.PRODUCTOS}/${id}`, productoData);
      toast.success('Producto actualizado');
      return response.data;
    } catch (error) {
      toast.error('Error al actualizar producto');
      throw error;
    }
  },

  async deleteProducto(id) {
    try {
      await apiClient.delete(`${API_ENDPOINTS.PRODUCTOS}/${id}`);
      toast.success('Producto eliminado');
      return { success: true };
    } catch (error) {
      toast.error('Error al eliminar producto');
      throw error;
    }
  },

  // ========== BÚSQUEDA Y FILTROS (Requerimiento #4) ==========
  async buscarProductos(termino) {
    try {
      const productos = await this.getProductos();
      return productos.filter(producto =>
        producto.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(termino.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(termino.toLowerCase())
      );
    } catch (error) {
      console.error('Error en búsqueda:', error);
      return [];
    }
  },

  async getProductosPorCategoria(categoria) {
    try {
      const productos = await this.getProductos();
      return productos.filter(p => p.categoria === categoria);
    } catch (error) {
      console.error('Error filtrando por categoría:', error);
      return [];
    }
  },

  // ========== VALIDACIONES (Requerimiento #2) ==========
  validarProducto(producto) {
    const errors = [];
    
    if (!producto.nombre || producto.nombre.trim().length === 0) {
      errors.push('El nombre es obligatorio');
    }
    
    if (!producto.precio || producto.precio <= 0) {
      errors.push('El precio debe ser mayor a 0');
    }
    
    if (!producto.descripcion || producto.descripcion.length < 10) {
      errors.push('La descripción debe tener al menos 10 caracteres');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

// ========== CONFIGURACIÓN PARA PRODUCCIÓN ==========

// Verificar conexión a la API al iniciar
export const checkApiHealth = async () => {
  try {
    await apiClient.get(API_ENDPOINTS.GATOS);
    console.log('✅ API de gatos conectada correctamente');
    return true;
  } catch  {
    console.warn('⚠️ API de gatos no disponible, usando datos locales');
    return false;
  }
};

// Función para simular delay (útil para testing)
export const simulateDelay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Exportar por defecto también
export default apiService;