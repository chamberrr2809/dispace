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
import { showNotification } from "@mantine/notifications";
import validator from "validator";
import { Helmet } from "react-helmet";
import { BrandGoogle, BrandTwitter, BrandGithub } from "tabler-icons-react";
import { faker } from "@faker-js/faker";
import { Navigate, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Register() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/app", {
          replace: true,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const twitterLogin = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/app", { replace: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const githubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/app", { replace: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [user, loading, error] = useAuthState(auth);

  const emailHandler = () => {
    if (validator.isEmail(email) && email !== "") {
      if (password !== "") {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            navigate("/app", { replace: true });
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.code === "auth/wrong-password") {
              showNotification({
                title: "Password tidak valid",
                message:
                  "Password yang kamu masukkan salah. Coba periksa lagi dan coba kembali!",
              });
            }
          });
      }
    } else {
      showNotification({
        title: "Email tidak valid",
        message:
          "Hey, sepertinya kamu salah memasukkan emailmu, atau typo? Tenang saja, kamu hanya perlu menggantinya",
        color: "red",
        autoClose: 8000,
      });
    }
  };

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
          Masuk ke akun Dispace
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Belum punya akun?{" "}
          <Anchor<"a">
            href="#"
            size="sm"
            onClick={(event) => {
              event.preventDefault();
              navigate("/register");
            }}
          >
            Daftar sekarang. Gratis!
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack>
            <Button
              variant="default"
              radius="xl"
              size="md"
              onClick={googleLogin}
              leftIcon={
                <BrandGoogle size={24} strokeWidth={2} color={"white"} />
              }
            >
              Lanjutkan dengan Google
            </Button>
            <Button
              variant="default"
              onClick={twitterLogin}
              leftIcon={
                <BrandTwitter size={24} strokeWidth={2} color={"white"} />
              }
              radius="xl"
              size="md"
            >
              Lanjutkan dengan Twitter
            </Button>
            <Button
              variant="default"
              onClick={githubLogin}
              leftIcon={
                <BrandGithub size={24} strokeWidth={2} color={"white"} />
              }
              radius="xl"
              size="md"
            >
              Lanjutkan dengan Github
            </Button>
          </Stack>
          <Divider
            label="atau daftar dengan email"
            labelPosition="center"
            my="lg"
          />

          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={faker.internet.email(
              faker.name.firstName(),
              faker.name.lastName(),
              faker.internet.domainName()
            )}
            required
          />
          <PasswordInput
            value={password}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                emailHandler();
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button loading={isLoading} fullWidth mt="xl" onClick={emailHandler}>
            Masuk
          </Button>
        </Paper>
      </Container>
    </>
  );
}
