'use client';

import { Admin, Resource } from 'react-admin';
import { dataProvider } from '@/lib/admin/apiClient';
import { authProvider } from '@/lib/admin/authProvider';
import Dashboard from './components/Dashboard';
import { EventList, EventCreate, EventEdit } from './resources/events';
import { SessionList, SessionCreate, SessionEdit } from './resources/sessions';
import { SpeakerList, SpeakerCreate, SpeakerEdit } from './resources/speakers';
import { RoomList, RoomCreate, RoomEdit } from './resources/rooms';

export default function AdminDashboard() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      title="EventSync Admin"
    >
      <Resource
        name="events"
        list={EventList}
        create={EventCreate}
        edit={EventEdit}
        recordRepresentation="title"
      />
      <Resource
        name="sessions"
        list={SessionList}
        create={SessionCreate}
        edit={SessionEdit}
        recordRepresentation="title"
      />
      <Resource
        name="speakers"
        list={SpeakerList}
        create={SpeakerCreate}
        edit={SpeakerEdit}
        recordRepresentation="name"
      />
      <Resource
        name="rooms"
        list={RoomList}
        create={RoomCreate}
        edit={RoomEdit}
        recordRepresentation="name"
      />
    </Admin>
  );
}