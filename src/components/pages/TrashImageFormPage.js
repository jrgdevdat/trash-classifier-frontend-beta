import BasePageLayout from "./BasePageLayout";
import TrashImageForm from "../TrashImageForm";

const TrashImageFormPage = () => {
  return (
    <BasePageLayout headingText="Clasificador de residuos">
      <TrashImageForm></TrashImageForm>
    </BasePageLayout>
  );
};

export default TrashImageFormPage;
