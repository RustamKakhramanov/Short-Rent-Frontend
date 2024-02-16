import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import LaravelDataProvider from "./Providers/LaravelDataProvider";
// import {PlaceList} from "./places";
import { List, Datagrid, TextField, useRecordContext } from 'react-admin';
// const dataProvider = LaravelDataProvider('http://localhost:8081/api');
import ruMessages from 'aor-language-russian';

const messages = {
  ru: ruMessages,
}
const i18nProvider = locale => {

  // change of locale after initial call returns a promise
  return ruMessages;
  // return asyncMessages[params.locale]();
}


const App = () => (
  <Admin 
  // dataProvider={dataProvider} 
  messages={messages} locale='ru'>
      <Resource name="companies" options={{ label: 'Компании' }}  list={ListGuesser}/>
      {/* <Resource name="places"  options={{ label: 'Места' }} list={PlaceList}/> */}
  </Admin>
);

export default App;