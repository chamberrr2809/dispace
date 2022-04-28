import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { showNotification } from "@mantine/notifications";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { EmailBanner } from "../../components/ConfirmationMail";
import { useNavigate } from "react-router-dom";
import randomstring from "randomstring";
import moment from "moment";
import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  MantineTheme,
  useMantineTheme,
  Badge,
  Modal,
  Button,
  Text,
  Progress,
  Group,
  Checkbox as Checkbok,
  ActionIcon,
  Tooltip,
  Image,
  Stack,
  Divider,
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

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

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
}));

const links = [
  {
    icon: Bulb,
    label: "Aktifitas",
    notifications: 3,
    destination: "activity",
  },
  {
    icon: Message,
    label: "Pesan Langsung",
    notifications: 4,
    focus: true,
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

const DirectMessages: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const childFunc = React.useRef(null);
  const [id, setId] = React.useState(
    randomstring.generate({
      length: 25,
      charset: "numeric",
    })
  );
  const theme = useMantineTheme();
  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [opened, setOpened] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
    <>
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: "none" }}
      >
        <ImageUploadIcon
          status={status}
          style={{ color: getIconColor(status, theme) }}
          size={80}
        />

        <div>
          <Text size="xl" inline>
            {isLoading
              ? "Mengupload Gambar... Mohon tunggu"
              : "Tarik gambar ke sini atau tekan untuk memilih gambar"}
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            File tidak dapat diubah setelah dipilih. Jenis file yang didukung
            adalah JPEG, SVG, PNG, WEBP, dan GIF maksimal 5mb
          </Text>
        </div>
      </Group>
      <Progress
        animate={isLoading ? false : true}
        value={isUploading ? progress : 100}
        striped={isLoading ? false : true}
      />
    </>
  );
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

  const buatServer = async (username: string | null) => {
    setLoad(true);
    await setDoc(doc(db, "spaces", id), {
      serverId: id,
      creationId: randomstring.generate(35),
      dateCreated: moment().format("dddd, MMMM Do YYYY"),
      timeCreated: moment().format("h:mm:ss a"),
      name: name,
      imageURL: imageUrl,
      createdBy: username,
    }).then(() => {
      navigate(`/app/server/${id}`);
    });
  };

  const mainLinks = links.map((link) => (
    <UnstyledButton
      onClick={() => redirectHandler(link.destination)}
      key={link.label}
      className={link.focus ? classes.mainLinkFocus : classes.mainLink}
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
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Buat/gabung Space"
        >
          <Group position="center">
            <Image
              src={!imageUrl ? "" : imageUrl}
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
            <Dropzone
              mt="md"
              onDrop={(files) => {
                console.log("accepted files", files);
                const metadata = {
                  contentType: files[0].type,
                };
                const storageRef = ref(
                  storage,
                  "profile_picture/" + `${Date.now()}-${files[0].name}`
                );
                const uploadTask = uploadBytesResumable(
                  storageRef,
                  files[0],
                  metadata
                );
                setIsUploading(true);
                showNotification({
                  title: `Mengupload ${files[0].name}`,
                  message:
                    "Foto Profilmu sedang diupload ke server Dispace. Mohon tunggu...",
                  loading: isLoading,
                  disallowClose: isLoading,
                });
                uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                    setIsLoading(true);
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                  },
                  (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                      case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        break;
                      case "storage/canceled":
                        // User canceled the upload
                        break;

                      // ...

                      case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                  },
                  () => {
                    setIsLoading(false);
                    showNotification({
                      title: "File Diupload",
                      message:
                        "File yang kamu pilih sudah di upload. Kamu bisa menggantinya kapan saja.",
                    });
                    setIsUploading(false);
                    getDownloadURL(uploadTask.snapshot.ref).then(
                      (downloadURL) => {
                        setImageUrl(downloadURL);
                      }
                    );
                  }
                );
              }}
              onReject={(files) => {
                if (files[0].errors[0].code === "file-too-large") {
                  showNotification({
                    title: "File Tidak Valid",
                    message:
                      "Ukuran file yang kamu pilih terlalu besar. Batas maksimal gambar adalah 5mb",
                  });
                }
                if (files[0].errors[0].code === "file-invalid-type") {
                  showNotification({
                    title: "File tidak valid",
                    message:
                      "Tipe file yang kamu pilih bukan gambar. File yang diupload harus gambar",
                  });
                }
              }}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              {(status) => dropzoneChildren(status, theme)}
            </Dropzone>
            <Stack sx={{ width: "100%" }}>
              <TextInput
                placeholder="Nama Spacemu"
                label="Nama Space"
                value={name}
                onChange={(e) => setName(e.target.value)}
                description="Nama yang mudah di ingat akan lebih menarik"
                required
              />
              <Checkbok label="Bagikan email saya secara publik di Space" />
            </Stack>
            <Button
              loading={load}
              fullWidth
              onClick={() => buatServer(user.displayName)}
            >
              Buat Server
            </Button>
          </Group>
        </Modal>
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
            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
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
      </>
    );
  }
  navigate("/login", { replace: true });
  return <h3>Sepertinya kamu belum mendaftar</h3>;
};

export default DirectMessages;
