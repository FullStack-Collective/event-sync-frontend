"use client";

import dynamic from 'next/dynamic';
import { authProvider, rootDataProvider } from "@/providers";

const Admin = dynamic(() => import('react-admin').then(mod => mod.Admin), { ssr: false });
const Resource = dynamic(() => import('react-admin').then(mod => mod.Resource), { ssr: false });
const ListGuesser = dynamic(() => import('react-admin').then(mod => mod.ListGuesser), { ssr: false });
const EditGuesser = dynamic(() => import('react-admin').then(mod => mod.EditGuesser), { ssr: false });
const ShowGuesser = dynamic(() => import('react-admin').then(mod => mod.ShowGuesser), { ssr: false });
const Create = dynamic(() => import('react-admin').then(mod => mod.Create), { ssr: false });

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
        create={Create}
        show={ShowGuesser}
        options={{ label: "📅 Événements" }}
      />
    </Admin>
  );
}