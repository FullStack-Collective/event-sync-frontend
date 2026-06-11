import { DataProvider } from "react-admin";
import { eventDataProvider } from "./eventDataProvider";

const dataProviderMap: Record<string, DataProvider> = {
  events: eventDataProvider,
};

const defaultDataProvider = eventDataProvider;

export const rootDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const provider = dataProviderMap[resource] || defaultDataProvider;
    return provider.getList(resource, params);
  },
  
  getOne: async (resource, params) => {
    const provider = dataProviderMap[resource] || defaultDataProvider;
    return provider.getOne(resource, params);
  },
  
  getMany: async (resource, params) => {
    const provider = dataProviderMap[resource] || defaultDataProvider;
    return provider.getMany(resource, params);
  },
  
  getManyReference: async (resource, params) => {
    const provider = dataProviderMap[resource] || defaultDataProvider;
    return provider.getManyReference(resource, params);
  },
  
  create: async (resource, params) => {
    const provider = dataProviderMap[resource] || defaultDataProvider;
    return provider.create(resource, params);
  },
  
  update: async (resource, params) => {
    const provider = dataProviderMap[resource] || defaultDataProvider;
    return provider.update(resource, params);
  },
  
  updateMany: async (resource, params) => {
    const provider = dataProviderMap[resource] || defaultDataProvider;
    return provider.updateMany(resource, params);
  },
  
  delete: async (resource, params) => {
    const provider = dataProviderMap[resource] || defaultDataProvider;
    return provider.delete(resource, params);
  },
  
  deleteMany: async (resource, params) => {
    const provider = dataProviderMap[resource] || defaultDataProvider;
    return provider.deleteMany(resource, params);
  },
};