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
} from 'react-admin';

export const EventList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="location" />
      <DateField source="startDate" showTime />
      <DateField source="endDate" showTime />
      <BooleanField source="isLive" />
      <BooleanField source="isUpcoming" />
      <TextField source="totalSessions" />
      <TextField source="totalQuestions" />
    </Datagrid>
  </List>
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" multiline rows={4} />
      <DateTimeInput source="startDate" validate={required()} />
      <DateTimeInput source="endDate" validate={required()} />
      <TextInput source="location" />
      <BooleanInput source="isLive" />
    </SimpleForm>
  </Edit>
);

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" multiline rows={4} />
      <DateTimeInput source="startDate" validate={required()} />
      <DateTimeInput source="endDate" validate={required()} />
      <TextInput source="location" />
    </SimpleForm>
  </Create>
);