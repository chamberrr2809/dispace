import React from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";
import { Check } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/landing-hero.svg";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function Hero() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Dispace.{""}
              <span className={classes.highlight}>Discord,</span> <br /> in a
              Space
            </Title>
            <Text color="dimmed" mt="md">
              Dispace adalah project Gratis dan Sumber Terbuka yang menjadi
              alternative untuk Discord. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Asperiores, vel.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Gratis dan mudah</b> – Kami tahu mendaftar adalah hal yang
                membosankan. Kami membuatnya mudah dan gratis
              </List.Item>
              <List.Item>
                <b>Cepat dan aman</b> - Kami menggunakan server berkecepatan
                tinggi dan dilengkapi dengan keamanan yang menjamin pesan dan
                datamu dikirimkan dengan aman.
              </List.Item>
              <List.Item>
                <b>Kamu Seorang Developer?</b> – Kami menghargainya. Dispace
                akan tetap gratis dan Open Source. Kamu bisa mengunjungi
                Repository Githubnya kapan saja.
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                radius="xl"
                size="md"
                onClick={() => navigate("/login")}
                className={classes.control}
              >
                Get started
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                onClick={() =>
                  window.open("https://github.com/chamberrr2809/dispace")
                }
                className={classes.control}
              >
                Source code
              </Button>
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
