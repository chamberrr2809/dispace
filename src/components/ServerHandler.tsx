import React from "react";
import { useNavigate } from "react-router-dom";
import randomstring from "randomstring";
import {
  TextInput,
  useMantineTheme,
  Modal,
  Button,
  Text,
  Group,
  Checkbox as Checkbok,
  Image,
  Stack,
} from "@mantine/core";

const ServerHandler = () => {
  const navigate = useNavigate();
  const childFunc = React.useRef(null);
  const [id, setId] = React.useState(
    randomstring.generate({
      length: 25,
      charset: "numeric",
    })
  );
  const theme = useMantineTheme();
  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [opened, setOpened] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Buat/gabung Space"
    >
      <Group position="center">
        <Image
          src={!imageUrl ? "" : imageUrl}
          placeholder={
            <>
              <Stack spacing="xs">
                <Text align="center">Space Icon</Text>
                <Text align="center">128x128px</Text>
              </Stack>
            </>
          }
          withPlaceholder
          width={128}
          height={128}
        />
        <Stack sx={{ width: "100%" }}>
          <TextInput
            placeholder="Nama Spacemu"
            label="Nama Space"
            value={name}
            onChange={(e) => setName(e.target.value)}
            description="Nama yang mudah di ingat akan lebih menarik"
            required
          />
          <Checkbok label="Bagikan email saya secara publik di Space" />
        </Stack>
        <Button loading={load} fullWidth>
          Buat Server
        </Button>
      </Group>
    </Modal>
  );
};

export default ServerHandler;
