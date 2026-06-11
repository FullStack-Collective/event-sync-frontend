import { fetchUtils, DataProvider } from "react-admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const httpClient = (url: string, options: any = {}) => {
  const token = localStorage.getItem("token");
  
  options.headers = new Headers({ Accept: "application/json" });
  
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  
  if (options.body) {
    options.headers.set("Content-Type", "application/json");
  }
  
  return fetchUtils.fetchJson(url, options);
};

export const createDataProvider = (resource: string): DataProvider => {
  const baseUrl = `${API_URL}/api/${resource}`;

  return {
    getList: async (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const filters = params.filter;

      const query = new URLSearchParams({
        page: page.toString(),
        limit: perPage.toString(),
        sortBy: field,
        sortOrder: order.toLowerCase(),
        ...filters,
      });

      const url = `${baseUrl}?${query}`;
      const { json } = await httpClient(url);

      return {
        data: json.data || json,
        total: json.pagination?.total || json.data?.length || 0,
      };
    },

    getOne: async (resource, params) => {
      const { json } = await httpClient(`${baseUrl}/${params.id}`);
      return { data: json.data || json };
    },

    getMany: async (resource, params) => {
      const promises = params.ids.map(id => httpClient(`${baseUrl}/${id}`));
      const responses = await Promise.all(promises);
      return { data: responses.map(r => r.json.data || r.json) };
    },

    getManyReference: async (resource, params) => {
      const { target, id } = params;
      const url = `${baseUrl}?${target}=${id}`;
      const { json } = await httpClient(url);
      return { data: json.data || json, total: json.data?.length || 0 };
    },

    create: async (resource, params) => {
      const { json } = await httpClient(baseUrl, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json.data || json };
    },

    update: async (resource, params) => {
      const { json } = await httpClient(`${baseUrl}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: json.data || json };
    },

    updateMany: async (resource, params) => {
      const promises = params.ids.map(id =>
        httpClient(`${baseUrl}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        })
      );
      const responses = await Promise.all(promises);
      return { data: responses.map(r => r.json.data?.id || r.json.id) };
    },

    delete: async (resource, params) => {
      const { json } = await httpClient(`${baseUrl}/${params.id}`, {
        method: "DELETE",
      });
      return { data: json.data || json };
    },

    deleteMany: async (resource, params) => {
      const promises = params.ids.map(id =>
        httpClient(`${baseUrl}/${id}`, { method: "DELETE" })
      );
      await Promise.all(promises);
      return { data: params.ids };
    },
  };
};