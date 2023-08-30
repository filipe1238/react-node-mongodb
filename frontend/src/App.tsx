import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { UserList, UserCreate, UserEdit } from "./components/users";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} show={ShowGuesser} />
   {/*  <Resource name="posts" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} /> */}
  </Admin>
);
