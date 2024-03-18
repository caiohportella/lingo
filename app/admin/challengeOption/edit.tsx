import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  required,
  BooleanInput,
} from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" label="Correct option" />
        <ReferenceInput source="challengeid" reference="challenges" />
        <TextInput source="audio" label="Audio URL" />
        <TextInput source="image" label="Image URL" />
      </SimpleForm>
    </Edit>
  );
};
