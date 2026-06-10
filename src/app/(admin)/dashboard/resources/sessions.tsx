import { NumberField } from "react-admin";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  Create,
  required,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin';

export const SessionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" label="Titre" />
      <TextField source="room.name" label="Salle" />
      <DateField source="startTime" label="Début" showTime />
      <DateField source="endTime" label="Fin" showTime />
      <BooleanField source="isLive" label="En direct" />
      <NumberField source="questionsCount" label="Questions" />
      <NumberField source="totalUpvotes" label="Upvotes" />
    </Datagrid>
  </List>
);

export const SessionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Titre" validate={required()} />
      <TextInput source="description" label="Description" multiline rows={4} />
      <ReferenceInput source="eventId" reference="events" label="Événement">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="roomId" reference="rooms" label="Salle">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <DateTimeInput source="startTime" label="Heure début" validate={required()} />
      <DateTimeInput source="endTime" label="Heure fin" validate={required()} />
      <NumberInput source="capacity" label="Capacité" />
    </SimpleForm>
  </Edit>
);

export const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Titre" validate={required()} />
      <TextInput source="description" label="Description" multiline rows={4} />
      <ReferenceInput source="eventId" reference="events" label="Événement">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="roomId" reference="rooms" label="Salle">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <DateTimeInput source="startTime" label="Heure début" validate={required()} />
      <DateTimeInput source="endTime" label="Heure fin" validate={required()} />
      <NumberInput source="capacity" label="Capacité" />
    </SimpleForm>
  </Create>
);