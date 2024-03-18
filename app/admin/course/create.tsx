import { SimpleForm, Create, TextInput, required } from "react-admin";

export const CourseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} label={"Title"} />
      <TextInput source="image" validate={[required()]} label={"Image"} />
    </SimpleForm>
  </Create>
);
