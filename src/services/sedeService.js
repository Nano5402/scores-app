import api from './api'

export const sedeService = {
  getAll:           ()    => api.get('/sedes'),
  getCanchasBySede: (id)  => api.get(`/sedes/${id}/canchas`),
}