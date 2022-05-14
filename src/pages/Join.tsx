import React from "react";
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Modal,
  Anchor,
  Center,
  Box,
  Stack,
  Image,
} from "@mantine/core";
import auth from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ArrowLeft } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
  input: {
    width: "100%",
  },
}));

export default function Join() {
  const { classes } = useStyles();
  const [image, setImage] = React.useState("");
  const [type, setType] = React.useState(1);
  const [opened, setOpened] = React.useState(false);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <h3>Loading</h3>;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  if (user) {
    return (
      <Container size={460} my={30}>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Upload Gambar"
        >
          {/* Modal content */}
        </Modal>
        <Title className={classes.title} align="center">
          {type === 1 ? "Buat Space" : "Bergabung ke Space"}
        </Title>
        <Text color="dimmed" size="sm" align="center">
          {type === 1
            ? "Mari buat space unik barumu. Membuat Space mudah dan cepat"
            : "Sudah memiliki Space atau ingin bergabung?"}
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <Stack align="center">
            <Image
              src={image}
              width={120}
              height={120}
              withPlaceholder
              placeholder={<Text>Space Image</Text>}
            />
            <Button onClick={() => setOpened(true)}>Pilih Gambar</Button>
            <TextInput
              placeholder="Nama space"
              className={classes.input}
              label="Nama Space"
              description="Buat nama unik untuk Space mu"
              required
            />
            <TextInput
              placeholder="Deskripsi Space"
              label="Deskripsi Space"
              className={classes.input}
              description="Penjelasan singkat tentang Space mu"
            />
          </Stack>
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    );
  }
  navigate("/login");

  return <h3>Mohon tunggu</h3>;
}
