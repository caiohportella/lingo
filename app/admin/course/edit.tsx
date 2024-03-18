import { SimpleForm, Edit, TextInput, required } from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="ID" />
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="image" validate={[required()]} label="Image" />
      </SimpleForm>
    </Edit>
  );
};
