import api from '@/lib/axios';

const BASE_URL = '/patients';

export async function getPatients() {
  const res = await api.get(`${BASE_URL}`, { params: { PageNumber: 1, PageSize: 10 } });
  return res.data;
}

export async function createPatient(data: any) {
  const res = await api.post(BASE_URL, data);
  return res.data;
}

export async function updatePatient(id: string, data: any) {
  const res = await api.put(`${BASE_URL}/${id}`, data);
  return res.data;
}

export async function deletePatient(id: string) {
  await api.delete(`${BASE_URL}/${id}`);
  return true;
}
