"use client";

import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, CreateGuesser } from "react-admin";
import { authProvider, rootDataProvider } from "@/providers";

export default function AdminPage() {
  return (
    <Admin 
      authProvider={authProvider}
      dataProvider={rootDataProvider}
      basename="/admin"
    >
      <Resource 
        name="events" 
        list={ListGuesser} 
        edit={EditGuesser} 
        create={CreateGuesser}
        show={ShowGuesser}
        options={{ label: "📅 Événements" }}
      />
    </Admin>
  );
}