import axios from "axios";

function backendAPI() {
  return axios.create({
    baseURL: `http://localhost:8080/api/`
  })
}

export function register(login, password) {
  let header = {
    'Content-type': 'application/json'
  };
  return backendAPI().post(
    "auth/register",
    JSON.stringify({"username": login, "password": password}),
    {headers: header}
  )
}

export function login(login, password) {
  let header = {
    'Content-type': 'application/json',
  };
  return backendAPI().post(
    "auth/login",
    JSON.stringify({"username": login, "password": password}),
    {headers: header}
  )
}

export function getAll() {
  let token = window.localStorage.getItem("token")
  let header = {
    'Content-type': 'application/json',
    'Authorization' : `Bearer ${token}`
  };
  return backendAPI().get(
    "shots",
    {headers: header})
}

export function check(point) {
  let token = window.localStorage.getItem("token")
  let header = {
    'Content-type': 'application/json',
    'Authorization' : `Bearer ${token}`
  };
  return backendAPI().post(
    "shots",
    point,
    {headers: header}
  )
}

export function clear() {
  let token = window.localStorage.getItem("token")
  let header = {
    'Content-type': 'application/json',
    'Authorization' : `Bearer ${token}`
  };
  return backendAPI().delete(
    "shots",
    {headers: header}
  )
}

