import { DataProvider } from "react-admin";
import { createDataProvider } from "./dataProvider";

export const eventDataProvider: DataProvider = {
  ...createDataProvider("events"),
  
  getUpcoming: async (limit: number = 10) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const { json } = await fetch(`${API_URL}/api/events/upcoming?limit=${limit}`);
    return json;
  },
};