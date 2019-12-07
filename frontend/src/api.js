const server = "https://127.0.0.1:5000/api";

async function post(url, data) {
  return fetch(
    url, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
  ).then(response => response.json())
}

/*
async function get(url) {
  return fetch(url, {
    method: "GET",
    credentials: "include"
  }).then(response => response.json())
}*/

class APIError {
  constructor(type, message='') {
    this.type = type;
    this.message = message
  }
}

const API = {
  async createBox(box) {
      if (!box.name) {
        throw new APIError("CreateBoxMissingName", "Box should have name!")
      }

      if (!box.savtas || !Array.isArray(box.savtas) || box.savtas.length < 2) {
        throw new APIError("CreateBoxNoSavtas", "Box should have savtas!")
      }

      if (box.savtas.reduce((acc, value) => acc || value === '', false)) {
        throw new APIError("CreateBoxEmptyBox", "Box should not be empty!")
      }

      return post(`${server}/box`, box)
  }
}

export default API;
