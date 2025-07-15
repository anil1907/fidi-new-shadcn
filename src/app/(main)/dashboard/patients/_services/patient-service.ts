import { APP_CONFIG } from "@/config/app-config";

const BASE_URL = `${APP_CONFIG.api.baseUrl}/patients`;

export async function getPatients(token: string) {
  const res = await fetch(`${BASE_URL}?PageNumber=1&PageSize=10`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Danışanlar alınamadı");
  return res.json();
}

export async function createPatient(data: any, token: string) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Danışan eklenemedi");
  return res.json();
}

export async function updatePatient(id: string, data: any, token: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(Object.assign({}, data, { id })),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Danışan güncellenemedi");
  }

  return res.json();
}

export async function deletePatient(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Danışan silinemedi");
  return true;
}
