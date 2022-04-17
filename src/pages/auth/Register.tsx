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
import auth from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Register() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <h3>error: {error}</h3>;
  }

  if (user) {
    navigate("/app", {
      replace: true,
    });
    return <h3>Sepertinya kamu sudah terdaftar. Tunggu sebentar</h3>;
  }
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
        <title>Dispace | Buat akun baru</title>
      </Helmet>
      <Container size={420} my={50}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Buat akun Dispace
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Sudah punya akun?{" "}
          <Anchor<"a">
            href="#"
            size="sm"
            onClick={(event) => {
              event.preventDefault();
              navigate("/login");
            }}
          >
            masuk ke akunmu.
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
          <Divider
            label="atau daftar dengan email"
            labelPosition="center"
            my="lg"
          />

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
            <Checkbox label="Remember me" />
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
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}
