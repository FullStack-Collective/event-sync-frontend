import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  required,
  NumberInput,
  NumberField,
  DateField,
} from 'react-admin';

export const RoomList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Nom de la salle" />
      <NumberField source="capacity" label="Capacité" />
      <DateField source="createdAt" label="Créé le" showTime />
      <DateField source="updatedAt" label="Modifié le" showTime />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom de la salle" validate={required()} />
      <NumberInput source="capacity" label="Capacité" />
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom de la salle" validate={required()} />
      <NumberInput source="capacity" label="Capacité" />
    </SimpleForm>
  </Create>
);