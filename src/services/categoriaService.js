import api from './api'

export const categoriaService = {
  getAll: (params = {}) => api.get('/categorias', { params }),
}