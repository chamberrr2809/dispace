import React from "react";
import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  Col,
} from "@mantine/core";
import {
  ReceiptOff,
  BrandOpenSource,
  Lock,
  ShieldLock,
} from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
    maxWidth: "98vw",
    overflowX: "hidden",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const features = [
  {
    icon: ReceiptOff,
    title: "Mudah dan Gratis",
    description:
      "Kami tahu mendaftar bukan hal yang menyenangkan. Kami membuatnya mudah, dan gratis..",
  },
  {
    icon: ShieldLock,
    title: "Aman",
    description:
      "Pesan-pesan akan disimpan di server yang aman dan terlindungi, tenang saja!",
  },
  {
    icon: Lock,
    title: "Datamu, kamu yang kendalikan",
    description:
      "Data-Datamu akan disimpan dengan aman di server kami. Kami hanya menyimpan, kamu yang pegang kendali penuh datamu.",
  },
  {
    icon: BrandOpenSource,
    title: "Developer Friendly",
    description:
      "Menjadi developer dan memulai projek dari awal bukan hal yang mudah. Kami membebaskan kamu untuk mengubah projek ini. Gratis tanpa biaya",
  },
];

export default function Features() {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon size={26} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            Fitur-Fitur unggulan kami!
          </Title>

          <Button
            variant="gradient"
            gradient={{ deg: 133, from: "blue", to: "cyan" }}
            size="lg"
            onClick={() => navigate("/auth")}
            radius="md"
            mt="xl"
          >
            Mulai Sekarang
          </Button>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid
            cols={2}
            spacing={30}
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </div>
  );
}
