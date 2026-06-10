import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  required,
  EmailField,
  UrlField,
  ImageField,
} from 'react-admin';

export const SpeakerList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="role" label="Rôle" />
      <ImageField source="photoUrl" label="Photo" />
      <UrlField source="twitter" label="Twitter" />
      <UrlField source="linkedin" label="LinkedIn" />
      <UrlField source="github" label="GitHub" />
    </Datagrid>
  </List>
);

export const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" />
      <TextInput source="role" label="Rôle / Titre" />
      <TextInput source="bio" label="Biographie" multiline rows={4} />
      <TextInput source="photoUrl" label="URL de la photo" />
      <TextInput source="twitter" label="Twitter (URL)" />
      <TextInput source="linkedin" label="LinkedIn (URL)" />
      <TextInput source="github" label="GitHub (URL)" />
      <TextInput source="website" label="Site web" />
    </SimpleForm>
  </Edit>
);

export const SpeakerCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" />
      <TextInput source="role" label="Rôle / Titre" />
      <TextInput source="bio" label="Biographie" multiline rows={4} />
      <TextInput source="photoUrl" label="URL de la photo" />
      <TextInput source="twitter" label="Twitter (URL)" />
      <TextInput source="linkedin" label="LinkedIn (URL)" />
      <TextInput source="github" label="GitHub (URL)" />
      <TextInput source="website" label="Site web" />
    </SimpleForm>
  </Create>
);