import {
  AppShell,
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Header,
  Title,
} from "@mantine/core";
import {
  Notes,
  CalendarStats,
  Gauge,
  PresentationAnalytics,
  FileAnalytics,
  Adjustments,
  Lock,
} from "tabler-icons-react";
import image from "../../assets/logo.svg";
import { LinksGroup } from "../../components/NavbarLinksGroup";
import { UserButton } from "../../components/UserButton";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase";
import { useNavigate } from "react-router-dom";

const mockdata = [
  { label: "Dashboard", icon: Gauge },
  {
    label: "Market news",
    icon: Notes,
    initiallyOpened: true,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Releases",
    icon: CalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: PresentationAnalytics },
  { label: "Contracts", icon: FileAnalytics },
  { label: "Settings", icon: Adjustments },
  {
    label: "Security",
    icon: Lock,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  image: {
    width: 50,
    height: 50,
  },
}));

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  if (loading) {
    return <h3>Loading</h3>;
  }

  if (error) {
    return <h3>Error: {error}</h3>;
  }

  if (user) {
    return (
      <>
        <AppShell
          padding="md"
          navbar={
            <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
              <Navbar.Section className={classes.header}>
                <Group position="apart">
                  <img className={classes.image} src={image} alt="Logo" />
                  <Title order={2}>Dispace</Title>
                  <Code sx={{ fontWeight: 700 }}>V1.0.0</Code>
                </Group>
              </Navbar.Section>

              <Navbar.Section
                grow
                className={classes.links}
                component={ScrollArea}
              >
                <div className={classes.linksInner}>{links}</div>
              </Navbar.Section>

              <Navbar.Section className={classes.footer}>
                <UserButton
                  image={user.photoURL}
                  name={user.displayName}
                  email={user.email}
                />
              </Navbar.Section>
            </Navbar>
          }
          header={
            <Header height={60} p="xs">
              {/* Header content */}
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          {/* Your application here */}
        </AppShell>
      </>
    );
  }
  return <h3>Login dlu tod</h3>;
}
