import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  NumberField,
  BooleanField,
} from "react-admin";

export const ChallengeOptionList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="text" />
        <BooleanField source="correct" />
        <ReferenceField source="challengeid" reference="challenges" />
        <TextField source="image" />
        <TextField source="audio" />
      </Datagrid>
    </List>
  );
};
