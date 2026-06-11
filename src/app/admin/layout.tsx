"use client";

import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import { authProvider } from "@/providers/authProvider";
import { 
  eventDataProvider, 
  sessionDataProvider, 
  speakerDataProvider, 
  roomDataProvider,
  questionDataProvider 
} from "@/providers";

export default function AdminLayout() {
  return (
    <Admin 
      authProvider={authProvider}
      dataProvider={eventDataProvider}
      basename="/admin"
    >
      <Resource name="events" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="sessions" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="speakers" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="rooms" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="questions" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    </Admin>
  );
}