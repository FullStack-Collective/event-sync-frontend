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
  BooleanInput,
  Create,
  required,
  Show,
  SimpleShowLayout,
  NumberField,
} from 'react-admin';
import { Event as EventIcon } from '@mui/icons-material';

export const EventList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" label="Titre" />
      <TextField source="location" label="Lieu" />
      <DateField source="startDate" label="Date début" showTime />
      <DateField source="endDate" label="Date fin" showTime />
      <BooleanField source="isLive" label="En direct" />
      <BooleanField source="isUpcoming" label="À venir" />
      <NumberField source="totalSessions" label="Sessions" />
      <NumberField source="totalQuestions" label="Questions" />
    </Datagrid>
  </List>
);

export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <TextField source="location" label="Lieu" />
      <DateField source="startDate" label="Date début" showTime />
      <DateField source="endDate" label="Date fin" showTime />
      <BooleanField source="isLive" label="En direct" />
      <BooleanField source="isUpcoming" label="À venir" />
      <BooleanField source="isPast" label="Passé" />
      <NumberField source="totalSessions" label="Nombre de sessions" />
      <NumberField source="totalQuestions" label="Nombre de questions" />
      <DateField source="createdAt" label="Créé le" showTime />
      <DateField source="updatedAt" label="Modifié le" showTime />
    </SimpleShowLayout>
  </Show>
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Titre" validate={required()} />
      <TextInput source="description" label="Description" multiline rows={4} />
      <DateTimeInput source="startDate" label="Date début" validate={required()} />
      <DateTimeInput source="endDate" label="Date fin" validate={required()} />
      <TextInput source="location" label="Lieu" />
      <BooleanInput source="isLive" label="Marquer comme en direct" />
    </SimpleForm>
  </Edit>
);

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Titre" validate={required()} />
      <TextInput source="description" label="Description" multiline rows={4} />
      <DateTimeInput source="startDate" label="Date début" validate={required()} />
      <DateTimeInput source="endDate" label="Date fin" validate={required()} />
      <TextInput source="location" label="Lieu" />
    </SimpleForm>
  </Create>
);