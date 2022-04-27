import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase";
import { EmailBanner } from "../../components/ConfirmationMail";
import { useNavigate } from "react-router-dom";
import image from "../../assets/logo.svg";
import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Modal,
  Button,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Image,
  Stack,
  Divider,
  AppShell,
  Title,
  Box,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import {
  Bulb,
  User,
  Checkbox,
  Search,
  Plus,
  Selector,
  Message,
} from "tabler-icons-react";
import { UserButton } from "../../components/UserButton";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkFocus: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  imageMain: {
    width: 100,
    height: 100,
    transition: "all 0.3s ease-in-out",

    "&:hover": {
      transform: "scale(1.3)",
    },
  },
}));

const links = [
  { icon: Bulb, label: "Aktifitas", notifications: 3, destination: "activity" },
  {
    icon: Message,
    label: "Pesan Langsung",
    notifications: 4,
    destination: "dm",
  },
  { icon: User, label: "Teman", destination: "friend" },
];

const collections = [
  { emoji: "👍", label: "Sales" },
  { emoji: "🚚", label: "Deliveries" },
  { emoji: "💸", label: "Discounts" },
  { emoji: "💰", label: "Profits" },
  { emoji: "✨", label: "Reports" },
  { emoji: "🛒", label: "Orders" },
  { emoji: "📅", label: "Events" },
  { emoji: "🙈", label: "Debts" },
  { emoji: "💁‍♀️", label: "Customers" },
];

const List: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [opened, setOpened] = React.useState(false);
  const { classes } = useStyles();

  const redirectHandler = (link: string) => {
    if (link === "activity") {
      navigate("/app/activity/@me");
    }
    if (link === "dm") {
      navigate("/app/messages/@me");
    }
    if (link === "friend") {
      navigate("/app/friends/@me");
    }
  };

  const mainLinks = links.map((link) => (
    <UnstyledButton
      onClick={() => redirectHandler(link.destination)}
      key={link.label}
      className={classes.mainLink}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span>{" "}
      {collection.label}
    </a>
  ));
  if (loading) {
    return <h3>Tunggu Sebentar</h3>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (user) {
    return (
      <>
        <AppShell
          navbar={
            <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
              <Navbar.Section className={classes.section}>
                <UserButton
                  image={user.photoURL}
                  name={user.displayName}
                  email={user.email}
                  icon={<Selector size={14} />}
                />
              </Navbar.Section>

              <TextInput
                placeholder="Search"
                size="xs"
                icon={<Search size={12} />}
                rightSectionWidth={70}
                rightSection={
                  <Code className={classes.searchCode}>Ctrl + K</Code>
                }
                styles={{ rightSection: { pointerEvents: "none" } }}
                mb="sm"
              />

              <Navbar.Section className={classes.section}>
                <div className={classes.mainLinks}>{mainLinks}</div>
              </Navbar.Section>

              <Navbar.Section className={classes.section}>
                <Group className={classes.collectionsHeader} position="apart">
                  <Text size="xs" weight={500} color="dimmed">
                    Spaces
                  </Text>
                  <Tooltip label="Buat/Gabung Space" withArrow position="right">
                    <ActionIcon
                      onClick={() => setOpened(true)}
                      variant="default"
                      size={18}
                    >
                      <Plus size={12} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
                <div className={classes.collections}>{collectionLinks}</div>
              </Navbar.Section>
            </Navbar>
          }
        >
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Buat/gabung Space"
          >
            <Group position="center">
              <Image
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
              <Button>Ubah Foto</Button>
            </Group>
            <Divider my={3} />
            <Stack></Stack>
          </Modal>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "90vh",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              spacing="xs"
            >
              <img
                className={classes.imageMain}
                src={image}
                alt="Dispace Logo"
              />
              <Title align="center" order={2}>
                Selamat datang di Dispace, {user.displayName}
              </Title>
              <Text color="dimmed" align="center">
                Pilih space atau kontak untuk memulai percakapan
              </Text>
            </Stack>
          </Box>
        </AppShell>
      </>
    );
  }
  navigate("/login", { replace: true });
  return <h3>Sepertinya kamu belum mendaftar</h3>;
};

export default List;
