const apiUrl = 'http://localhost:8881';

export const fetchResources = async (resource: string, query?: object) => {
  const response = await fetch(`${apiUrl}/${resource}`);
  return await response.json();
};
