async function template(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
}

export async function servicesList() {
  return template(process.env.REACT_APP_BACKEND_URL);
}

export async function servicesDetails(id) {
  return template(process.env.REACT_APP_BACKEND_URL + "/" + +id);
}
