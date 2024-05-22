import axios from "axios";
const baseUrl = import.meta.env.VITE_HEALTH_LINK_API_URL;

export async function fetchSpecialitys() {
  const { data } = await (
    await axios(`${baseUrl}/universal_catalogue/speciality`)
  ).data;

  return data;
}

export async function fetchTeleconsultations(token) {
  const { data } = await (
    await axios(`${baseUrl}/meetings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return data;
}

export async function fetchChats(token) {
  const { data } = await (
    await axios(`${baseUrl}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return data;
}

export async function fetchChatById(token, id) {
  const { data } = await (
    await axios(`${baseUrl}/chats/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return data;
}

export async function fetchPostMessage(token, id_chat, message) {
  const { data } = await axios.post(
    `${baseUrl}/chats/message`,
    {
      id_chat,
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.error;
}

export const fetchAuthGoogleUrl = async () => {
  const { data } = await (await axios(`${baseUrl}/auth/google`)).data;

  return data;
};

export const fetchPostMeet = async (
  token,
  consult_reason,
  date,
  id_patient
) => {
  const { data } = await (
    await axios.post(
      `${baseUrl}/meetings`,
      {
        consult_reason,
        date,
        id_patient,
        role: "doctor",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).data;
  return data.error;
};

export async function fetchMeetById(token, id) {
  const { data } = await (
    await axios(`${baseUrl}/meetings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return data;
}

export async function fetchUserById(id, role) {
  const route = `/${role === "doctor" ? "doctors" : "patients"}/${id}`;

  const { data } = await (await axios(`${baseUrl}${route}`)).data;

  return data;
}

export async function fetchDoctors(fullname, sex, speciality) {
  let route = "/doctors?";

  if (fullname) route += `fullname=${fullname}&&`;
  if (sex) route += `sex=${sex}&&`;
  if (speciality) route += `speciality=${speciality}&&`;

  const { data } = await (await axios(`${baseUrl}${route}`)).data;

  return data;
}

export async function fetchPostChat(token, consult_reason, id_doctor) {
  const data = await axios.post(
    `${baseUrl}/chats`,
    { consult_reason, id_doctor },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export async function fetchDeleteChat(token, id_chat) {
  const { data } = await axios.delete(`${baseUrl}/chats/${id_chat}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function fetchDeleteMeet(token, id_meet) {
  const { data } = await axios.delete(`${baseUrl}/meetings/${id_meet}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function fetchPutUserPassword(token, newPassword) {
  const { data } = await axios.put(
    `${baseUrl}/auth/password`,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
