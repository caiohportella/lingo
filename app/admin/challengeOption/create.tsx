import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  required,
  BooleanInput,
} from "react-admin";

export const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" label="Correct option" />
        <ReferenceInput source="challengeid" reference="challenges" />
        <TextInput source="image" label="Image URL" />
        <TextInput source="audio" label="Audio URL" />
      </SimpleForm>
    </Create>
  );
};
