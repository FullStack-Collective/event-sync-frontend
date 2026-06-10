'use client';

import { Admin, Resource } from 'react-admin';
import { dataProvider } from '@/lib/admin/apiClient';
import { authProvider } from '@/lib/admin/authProvider';
import Dashboard from './components/Dashboard';
import { EventList, EventCreate, EventEdit, EventShow } from './resources/events';
import { SessionList, SessionCreate, SessionEdit } from './resources/sessions';
import { SpeakerList, SpeakerCreate, SpeakerEdit } from './resources/speakers';
import { RoomList, RoomCreate, RoomEdit } from './resources/rooms';
import { Event, Session, Speaker, MeetingRoom } from '@mui/icons-material';

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
        show={EventShow}
        icon={Event}
        recordRepresentation="title"
        options={{ label: 'Événements' }}
      />
      <Resource
        name="sessions"
        list={SessionList}
        create={SessionCreate}
        edit={SessionEdit}
        icon={Session}
        recordRepresentation="title"
        options={{ label: 'Sessions' }}
      />
      <Resource
        name="speakers"
        list={SpeakerList}
        create={SpeakerCreate}
        edit={SpeakerEdit}
        icon={Speaker}
        recordRepresentation="name"
        options={{ label: 'Speakers' }}
      />
      <Resource
        name="rooms"
        list={RoomList}
        create={RoomCreate}
        edit={RoomEdit}
        icon={MeetingRoom}
        recordRepresentation="name"
        options={{ label: 'Salles' }}
      />
    </Admin>
  );
}