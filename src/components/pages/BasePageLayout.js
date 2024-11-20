import { Flex, Heading, Box } from "@chakra-ui/react";

function BasePageLayout({ headingText, children }) {
  return (
    <Box as="div" bg="gray.300" h="100vh">
      <Flex as="div" direction="column" align="center" justify="center">
        <Heading size="lg" mt={[3, null]} mb={5} textAlign="center">
          {headingText}
        </Heading>
        <Box bg="gray.100" p={5} rounded="md">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}

export default BasePageLayout;
