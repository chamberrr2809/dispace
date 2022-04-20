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
  Anchor,
  Center,
  Box,
} from "@mantine/core";
import auth from "../firebase";
import validator from "validator";
import { showNotification } from "@mantine/notifications";
import { sendPasswordResetEmail } from "firebase/auth";
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
}));

export default function ForgotPassword() {
  const { classes } = useStyles();
  const [isDisabled, setIsDisabled] = React.useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const sendEmail = () => {
    if (validator.isEmail(email)) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          showNotification({
            title: "Email sudah terkirim",
            message:
              "Link untuk mereset password sudah dikirim ke emailmu, klik untuk mengubah password",
          });
          setIsDisabled(true);
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            showNotification({
              title: "Pengguna tidak ditemukan :*",
              message:
                "Email yang kamu masukkan tidak ditemukan di Database Dispace :( Pastikan emailmu benar dan kamu sudah mendaftar di Dispace",
              color: "red",
              autoClose: 8000,
            });
          }
        });
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

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Sepertinya kamu melupakan passwordmu
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Tenang saja! Mengatur ulang sandi tidak akan lama
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Email kamu"
          placeholder="me@example.com"
          required
          value={email}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              sendEmail();
            }
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor color="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <ArrowLeft size={12} />
              <Box ml={5} onClick={() => navigate("/login")}>
                Saya sudah ingat passwordnya. Masuk ke akun
              </Box>
            </Center>
          </Anchor>
          <Button
            fullWidth
            disabled={isDisabled}
            onClick={sendEmail}
            className={classes.control}
          >
            Reset password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
