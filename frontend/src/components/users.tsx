// in src/users.tsx
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  SimpleList,
  Create,
  SimpleForm,
  TextInput,
  useRecordContext,
  Edit,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

const UserEditTitle = () => {
  const record = useRecordContext();
  return <span>User {record ? `"${record.name}"` : ""}</span>;
};

export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List title={'Users'}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="username" />
          <EmailField source="email" />
        </Datagrid>
      )}
    </List>
  );
};

export const UserEdit = () => (
  <Edit title={<UserEditTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="password" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create title={'Create User'}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);
