import React from "react";
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Image,
  Modal,
  Stack,
  Group,
  InputWrapper,
  Textarea,
  useMantineTheme,
  MantineTheme,
  Progress,
} from "@mantine/core";
import auth, { db } from "../../firebase";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { showNotification } from "@mantine/notifications";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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

export default function Onboarding() {
  const { classes } = useStyles();
  const [selectedOption, setSelectedOption] = React.useState<string>();
  const [opened, setOpened] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [load, setLoad] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
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
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [nama, setNama] = React.useState("");

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    const finishProfile = () => {
      setLoad(true);
      if (username !== "" && nama !== "" && bio !== "") {
        updateProfile(user, {
          displayName: username,
          photoURL: imageUrl,
        })
          .then(async () => {
            await setDoc(doc(db, "users", user.uid), {
              userId: user.uid,
              realName: nama,
              bio: bio,
            }).then(() => {
              setLoad(false);
              navigate("/app", { replace: true });
            });
          })
          .catch((error) => {
            alert(error.code);
          });
      } else {
        setLoad(false);
        showNotification({
          title: "Data tidak valid",
          message: "Isi semua input yang dibutuhkan",
        });
      }
    };
    return (
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Dispace Avatar"
        >
          <Title order={4}>Upload Gambar (Disarankan berukuran kotak)</Title>
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
                  setOpened(false);
                  setIsLoading(false);
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
        </Modal>
        <Container size={460} my={30}>
          <Title className={classes.title} align="center">
            Hanya beberapa langkah lagi
          </Title>
          <Text color="dimmed" size="sm" align="center">
            Isi input yang diperlukan untuk menyelesaikan pendaftaranmu
          </Text>

          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <Stack>
              <TextInput
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                description="Buat nama unikmu, akan ditampilkan di profil dan dalam chat"
                required
              />
              <TextInput
                label="Nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                description="Tidak wajib, namamu akan diganti menggunakan username mu jika tidak diisi"
              />
              <Textarea
                placeholder="Tulis sedikit tentang mu"
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                description="Dibutuhkan untuk mendaftar, ubah kapan saja"
                required
              />

              <InputWrapper
                id="input-demo"
                required
                label="Foto Profil"
                description="Pilih dan kustomisasi Foto Profilmu dengan Dispace Avatar"
              >
                <Group>
                  <Button id="input-demo" onClick={() => setOpened(true)}>
                    Pilih Foto
                  </Button>
                  <Image
                    fit="contain"
                    sx={{ display: "block" }}
                    width={80}
                    height={80}
                    src={user.photoURL ?? imageUrl}
                    withPlaceholder
                  />
                </Group>
              </InputWrapper>
            </Stack>
            <Group position="apart" mt="lg" className={classes.controls}>
              <Button
                fullWidth
                loading={load}
                className={classes.control}
                onClick={finishProfile}
              >
                Selesai
              </Button>
            </Group>
          </Paper>
        </Container>
      </>
    );
  }
  navigate("/login");
  return <h3>Tunggu sebentar</h3>;
}
