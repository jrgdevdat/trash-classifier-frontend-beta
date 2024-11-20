import { useState } from "react";
import { useFormik } from "formik";
import useCustomToast from "../hooks/useCustomToast";
import { VStack, Box, Input, FormLabel, Button, Image } from "@chakra-ui/react";

const TrashImageForm = () => {
  const [trashImageFile, setTrashImageFile] = useState(null);
  const [trashImageFileUrl, setTrashImageFileUrl] = useState(null);
  const customToast = useCustomToast();
  const formikForm = useFormik({
    initialValues: {},
    onSubmit: (values, actions) => {
      const trashImageformData = new FormData();
      trashImageformData.append("image_file", trashImageFile);

      setTimeout(() => {
        fetch(
          `${process.env.REACT_APP_BACKEND_SERVER_DOMAIN}/trash-classifier-predictions`,
          {
            method: "POST",
            body: trashImageformData,
            headers: {
              Accept: "application/json",
            },
          }
        )
          .then(async (response) => {
            // Obtener status
            const responseStatus = response.status;

            // Obtener cuerpo de la respuesta (json)
            const responseBody = await response.json();

            // Procesar respuesta
            switch (responseStatus) {
              case 201: {
                // Solicitud exitosa
                const trashPredictedType = responseBody.type;
                customToast("success", "Predicción", trashPredictedType);
                break;
              }

              case 500: {
                // Ocurrió un error del servidor
                const errorMessage = responseBody.error;
                customToast("error", "Error del servidor", errorMessage);
                break;
              }

              default: {
                customToast(
                  "error",
                  "Error",
                  "Ocurrió un error al procesar la solicitud"
                );
              }
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            customToast("error", "Error", errorMessage);
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }, 1000);
    },
  });

  const handleTrashInputChange = (event) => {
    if (trashImageFileUrl !== null) {
      URL.revokeObjectURL(trashImageFileUrl);
    }
    const selectedTrashInputFile = event.target.files[0];
    setTrashImageFile(selectedTrashInputFile);
    const selectedTrashInputFileUrl = URL.createObjectURL(
      selectedTrashInputFile
    );
    setTrashImageFileUrl(selectedTrashInputFileUrl);
  };

  return (
    <form onSubmit={formikForm.handleSubmit}>
      <VStack>
        <Box w="100%" align="center">
          <FormLabel fontWeight="bold" htmlFor="trash-image-input">
            Imagen del residuo
          </FormLabel>
          <Input
            id="trash-image-input"
            name="trash-image-input"
            type="file"
            isRequired={true}
            onChange={handleTrashInputChange}
          />
        </Box>
        {trashImageFileUrl !== null ? (
          <Box>
            <Image
              src={trashImageFileUrl}
              boxSize="150px"
              alt="Imagen seleccionada del residuo"
            />
          </Box>
        ) : (
          <></>
        )}
        <Box w="100%" align="center">
          <Button
            type="submit"
            isLoading={formikForm.isSubmitting}
            loadingText="Procesando"
            fontWeight="bold"
            bg="gray.300"
            variant="solid"
            borderStyle="solid"
            borderWidth="2px"
            borderColor="black"
          >
            Clasificar
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default TrashImageForm;
