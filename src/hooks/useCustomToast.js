import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();

  const generalToastConfig = {
    position: "top",
    isClosable: true,
    duration: 4000,
  };

  const showCustomToast = (status, title, message) => {
    if (status === "success") {
      toast({
        ...generalToastConfig,
        title: title,
        status: status,
        description: message,
      });
    } else if (status === "error") {
      toast({
        ...generalToastConfig,
        title: title,
        status: status,
        description: message,
      });
    }
  };

  return showCustomToast;
};

export default useCustomToast;
