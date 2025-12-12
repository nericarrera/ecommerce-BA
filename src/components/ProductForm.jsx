import { useState } from 'react';
import { productService } from '../services/api';
import { toast } from 'react-toastify';
import { FaSave, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: product?.nombre || '',
    precio: product?.precio || 0,
    descripcion: product?.descripcion || '',
    categoria: product?.categoria || 'gatos',
    imagen: product?.imagen || ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (formData.precio <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }
    
    if (formData.descripcion.length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor corrige los errores del formulario');
      return;
    }
    
    setLoading(true);
    
    try {
      if (product?.id) {
        // Editar producto existente
        await productService.updateProduct(product.id, formData);
      } else {
        // Crear nuevo producto
        await productService.createProduct(formData);
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' ? parseFloat(value) || 0 : value
    }));
    
    // Limpiar error del campo al modificar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          {product?.id ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre *</label>
            <input
              type="text"
              className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
            {errors.nombre && (
              <div className="invalid-feedback">{errors.nombre}</div>
            )}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Precio *</label>
            <input
              type="number"
              step="0.01"
              className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              min="0"
            />
            {errors.precio && (
              <div className="invalid-feedback">{errors.precio}</div>
            )}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Descripción *</label>
            <textarea
              className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
              name="descripcion"
              rows="3"
              value={formData.descripcion}
              onChange={handleChange}
            />
            {errors.descripcion && (
              <div className="invalid-feedback">{errors.descripcion}</div>
            )}
            <small className="text-muted">
              Mínimo 10 caracteres. Actual: {formData.descripcion.length}
            </small>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="gatos">Gatos</option>
              <option value="perros">Perros</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label className="form-label">URL de Imagen</label>
            <input
              type="text"
              className="form-control"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
          
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              <FaTimes className="me-2" /> Cancelar
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Guardando...
                </>
              ) : (
                <>
                  <FaSave className="me-2" />
                  {product?.id ? 'Actualizar' : 'Guardar Producto'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;