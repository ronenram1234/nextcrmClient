import axios, { AxiosResponse } from "axios";
import { User, UserLoginFormValues, UserReg } from "../interfaces/User";
import { jwtDecode } from "jwt-decode";
import { Jwt } from "../interfaces/Jwt";

const api: string = `${process.env.REACT_APP_API}/users`;
const tokenKey = "crmUserId";

// access to DB
export function createUser(user: UserReg) {
  return axios.post(api, user);
}

export function getUserToken({
  email,
  password,
}: UserLoginFormValues): Promise<AxiosResponse> {
  // const axios = require("axios");
  const data = {
    email: email,
    password: password,
  };

  return axios.post(`${api}/login`, data, {
    headers: { "Content-Type": "application/json" },
  });
}

export function getUserDetail(
  id: string,
  token: string
): Promise<AxiosResponse> {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${api}/${id}`,

    headers: {
      "x-auth-token": `${token}`,
    },
  };

  return axios.request(config);
}

export function getAllUsersDetail(token: string): Promise<AxiosResponse> {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: api,
    headers: {
      "x-auth-token":
        token,
    },
  };

  return axios.request(config);
}

// acess to localstorage

export function setTokenLocalStorage(token: string) {
  
  localStorage.setItem(tokenKey, token);
}

export function getTokenLocalStorage(): string {
  const token = localStorage.getItem(tokenKey) || "";
  return token;
}

export function removeTokenLocalStorage() {
  localStorage.removeItem(tokenKey);
}

// Use jwt decode

export function tokenToDecoode(token: string): Jwt {
  const record: Jwt = jwtDecode(token) || {};
  return record;
}

//
