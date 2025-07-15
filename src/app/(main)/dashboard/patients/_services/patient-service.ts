const BASE_URL = "https://localhost:5001/api/patients";

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
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Danışan güncellenemedi");
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
