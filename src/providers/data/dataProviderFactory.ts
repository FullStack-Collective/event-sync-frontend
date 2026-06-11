import { DataProvider, GetListParams, GetManyReferenceParams } from "react-admin";
import { httpClient, API_URL } from "@/lib/httpClient";

export const createDataProvider = (resource: string): DataProvider => {
  const baseUrl = `${API_URL}/api/${resource}`;

  return {
    getList: async (resourceName: string, params: GetListParams) => {
      console.log(`[${resource}] getList:`, params);
      
      const page = params.pagination?.page || 1;
      const perPage = params.pagination?.perPage || 10;
      const field = params.sort?.field || "id";
      const order = params.sort?.order || "ASC";
      const filters = params.filter || {};

      const query = new URLSearchParams({
        page: page.toString(),
        limit: perPage.toString(),
        sortBy: field,
        sortOrder: order.toLowerCase(),
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.append(key, String(value));
        }
      });

      const url = `${baseUrl}?${query.toString()}`;
      console.log(`[${resource}] GET URL:`, url);
      
      const { json } = await httpClient(url);

      return {
        data: json.data || json,
        total: json.pagination?.total || (json.data?.length || 0),
      };
    },

    getOne: async (resourceName: string, params: { id: number | string }) => {
      console.log(`[${resource}] getOne:`, params.id);
      const { json } = await httpClient(`${baseUrl}/${params.id}`);
      return { data: json.data || json };
    },

    getMany: async (resourceName: string, params: { ids: (number | string)[] }) => {
      console.log(`[${resource}] getMany:`, params.ids);
      const promises = params.ids.map(id => httpClient(`${baseUrl}/${id}`));
      const responses = await Promise.all(promises);
      return { data: responses.map(r => r.json.data || r.json) };
    },

    getManyReference: async (resourceName: string, params: GetManyReferenceParams) => {
      console.log(`[${resource}] getManyReference:`, params);
      const page = params.pagination?.page || 1;
      const perPage = params.pagination?.perPage || 10;
      const url = `${baseUrl}?${params.target}=${params.id}&page=${page}&limit=${perPage}`;
      const { json } = await httpClient(url);
      return { data: json.data || json, total: json.data?.length || 0 };
    },

    create: async (resourceName: string, params: { data: any }) => {
      console.log(`[${resource}] create:`, params.data);
      const { json } = await httpClient(baseUrl, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json.data || json };
    },

    update: async (resourceName: string, params: { id: number | string; data: any }) => {
      console.log(`[${resource}] update:`, params.id, params.data);
      const { json } = await httpClient(`${baseUrl}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: json.data || json };
    },

    updateMany: async (resourceName: string, params: { ids: (number | string)[]; data: any }) => {
      console.log(`[${resource}] updateMany:`, params.ids);
      const promises = params.ids.map(id =>
        httpClient(`${baseUrl}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        })
      );
      const responses = await Promise.all(promises);
      return { data: responses.map(r => r.json.data?.id || r.json.id) };
    },

    delete: async (resourceName: string, params: { id: number | string }) => {
      console.log(`[${resource}] delete:`, params.id);
      const { json } = await httpClient(`${baseUrl}/${params.id}`, {
        method: "DELETE",
      });
      return { data: json.data || json };
    },

    deleteMany: async (resourceName: string, params: { ids: (number | string)[] }) => {
      console.log(`[${resource}] deleteMany:`, params.ids);
      const promises = params.ids.map(id =>
        httpClient(`${baseUrl}/${id}`, { method: "DELETE" })
      );
      await Promise.all(promises);
      return { data: params.ids };
    },
  };
};