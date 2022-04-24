import React, { useState } from "react";
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
  Box,
  Progress,
  Center,
  Stack,
  Popover,
} from "@mantine/core";
import validator from "validator";
import { CheckIcon, Cross1Icon } from "@modulz/radix-icons";
import { Helmet } from "react-helmet";
import { showNotification } from "@mantine/notifications";
import { useInputState } from "@mantine/hooks";
import { BrandGoogle, BrandTwitter, BrandGithub } from "tabler-icons-react";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
} from "firebase/auth";
import auth from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <CheckIcon /> : <Cross1Icon />} <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function Register() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/onboarding", {
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
        navigate("/onboarding", { replace: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const githubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/onboarding", { replace: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const emailLogin = () => {
    if (validator.isEmail(email) && email !== "") {
      if (value !== "") {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, value)
          .then((userCredential) => {
            navigate("/onboarding", { replace: true });
            setIsLoading(false);
          })
          .catch((error) => {
            alert(error.code);
            setIsLoading(false);
            if (error.code === "auth/email-already-in-use") {
              showNotification({
                title: "Email sudah digunakan",
                message:
                  "Email yang kamu masukkan sudah digunakan untuk membuat akun. Coba dengan email lain",
                color: "red",
                autoClose: 8000,
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
        <title>Dispace | Buat akun baru</title>
      </Helmet>
      <Container size={420} my={50} mb={100}>
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
            Masuk ke akunmu.
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
            onChange={(event) => setEmail(event.target.value)}
            placeholder={faker.internet.email()}
            required
          />
          <Popover
            opened={popoverOpened}
            position="bottom"
            placement="start"
            withArrow
            styles={{ popover: { width: "100%" } }}
            trapFocus={false}
            transition="pop-top-left"
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
            target={
              <PasswordInput
                required
                label="Your password"
                placeholder="Your password"
                description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
              />
            }
          >
            <Progress
              color={color}
              value={strength}
              size={5}
              style={{ marginBottom: 10 }}
            />
            <PasswordRequirement
              label="Includes at least 6 characters"
              meets={value.length > 5}
            />
            {checks}
          </Popover>
          <Group position="apart" mt="md">
            <Checkbox
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              label="Saya setuju dengan Terms of Service dan Privacy Policy yang berlaku"
            />

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
          <Button
            fullWidth
            loading={isLoading}
            mt="xl"
            disabled={!checked ? true : false}
            onClick={emailLogin}
          >
            Buat Akun
          </Button>
        </Paper>
      </Container>
    </>
  );
}
