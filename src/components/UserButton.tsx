import React from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  UnstyledButton,
  UnstyledButtonProps,
  Menu,
  Group,
  Text,
  Avatar,
  Divider,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import {
  ChevronRight,
  Logout,
  Heart,
  Star,
  Message,
  Settings,
  PlayerPause,
  Trash,
  SwitchHorizontal,
} from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps {
  image: string | null;
  name: string | null;
  email: string | null;
  icon?: React.ReactNode | null;
}

export function UserButton({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const navigate = useNavigate();

  return (
    <>
      <Group position="center">
        <Menu
          control={
            <UnstyledButton className={classes.user} {...others}>
              <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {name}
                  </Text>

                  <Text color="dimmed" size="sm">
                    {email}
                  </Text>
                </div>

                {icon || <ChevronRight size={16} />}
              </Group>
            </UnstyledButton>
          }
          withArrow
          size={300}
          placement="center"
          transition="pop"
        >
          <Menu.Item
            onClick={() => navigate("/app/settings/profile")}
            rightSection={<ChevronRight size={14} />}
          >
            <Group>
              <Avatar radius="xl" src={image} />

              <div>
                <Text weight={500}>{name}</Text>
                <Text size="xs" color="dimmed">
                  {email}
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Divider />

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            onClick={() => navigate("/app/settings/account")}
            icon={<Settings size={14} />}
          >
            Account settings
          </Menu.Item>
          <Menu.Item icon={<SwitchHorizontal size={14} />}>
            Change account
          </Menu.Item>
          <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>

          <Divider />

          <Menu.Label>Dispace V1.0.0</Menu.Label>
        </Menu>
      </Group>
    </>
  );
}
