// src/components/admin/AdminApp.tsx
'use client';

import { Admin, Resource, ListGuesser, EditGuesser, Create } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';

export default function AdminApp() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      basename="/admin/dashboard"
    >
      <Resource 
        name="events" 
        list={ListGuesser} 
        edit={EditGuesser} 
        create={Create}
        recordRepresentation="title"
      />
      <Resource 
        name="rooms" 
        list={ListGuesser} 
        edit={EditGuesser} 
        create={Create}
        recordRepresentation="name"
      />
      <Resource 
        name="sessions" 
        list={ListGuesser} 
        edit={EditGuesser} 
        create={Create}
        recordRepresentation="title"
      />
      <Resource 
        name="speakers" 
        list={ListGuesser} 
        edit={EditGuesser} 
        create={Create}
        recordRepresentation="name"
      />
      <Resource 
        name="questions" 
        list={ListGuesser} 
        edit={EditGuesser} 
        create={Create}
      />
    </Admin>
  );
}