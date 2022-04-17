import React from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Divider,
  Text,
  Container,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import { Helmet } from "react-helmet";
import { BrandGoogle, BrandDiscord, BrandSpotify } from "tabler-icons-react";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="https://cdn.discordapp.com/attachments/937506444331335760/964505910187814942/logo-dispace-removebg-preview.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discord in a Space" />
        <meta property="og:title" content="Dispace" />
        <meta property="og:url" content="http://localhost" />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/937506444331335760/964505910187814942/logo-dispace-removebg-preview.png"
        />
        <meta property="og:description" content="Discord in a Space" />
        <title>Dispace | Masuk ke akunmu</title>
      </Helmet>
      <Container size={420} my={50}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Masuk ke Dispace
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Tidak punya akun?{" "}
          <Anchor<"a">
            href="#"
            size="sm"
            onClick={(event) => {
              event.preventDefault();
              navigate("/register");
            }}
          >
            Buat akun. Gratis!
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack>
            <Button
              variant="default"
              radius="xl"
              size="md"
              leftIcon={
                <BrandGoogle size={24} strokeWidth={2} color={"white"} />
              }
            >
              Lanjutkan dengan Google
            </Button>
            <Button
              variant="default"
              leftIcon={
                <BrandDiscord size={24} strokeWidth={2} color={"white"} />
              }
              radius="xl"
              size="md"
            >
              Lanjutkan dengan Discord
            </Button>
            <Button
              variant="default"
              leftIcon={
                <BrandSpotify size={24} strokeWidth={2} color={"white"} />
              }
              radius="xl"
              size="md"
            >
              Lanjutkan dengan Spotify
            </Button>
          </Stack>
          <Text my="md" align="center" color="gray">
            atau
          </Text>

          <TextInput
            label="Email"
            placeholder={faker.internet.email(
              faker.name.firstName(),
              faker.name.lastName(),
              faker.internet.domainName()
            )}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Group position="apart" mt="md">
            <Checkbox label="Ingat saya" />
            <Anchor<"a">
              onClick={(event) => {
                event.preventDefault();
                navigate("/forgot-password");
              }}
              href="#"
              size="sm"
            >
              Lupa password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Masuk
          </Button>
        </Paper>
      </Container>
    </>
  );
}
