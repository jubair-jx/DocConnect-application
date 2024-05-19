"use client";
import AutoFileUploader from "@/components/Form/FileUploader/AutoFileUploader";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/profileApi";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FilterIcon from "@mui/icons-material/Filter";
import { Box, Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import DoctorInformation from "./components/DoctorInformation";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
function DoctorProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const [updateMYProfile, { data: updatedData, isLoading: uploading }] =
    useUpdateMYProfileMutation();
  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    updateMYProfile(formData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  //   console.log(data);
  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Container sx={{ marginTop: 6 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                height: 300,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Image
                height={100}
                width={250}
                className=" rounded-xl"
                src={data?.profilePhoto ? data?.profilePhoto : "/"}
                alt="User Photo"
              />
            </Box>

            {uploading ? (
              <p>Uploading...</p>
            ) : (
              <AutoFileUploader
                name="file"
                sx={{ width: "70%" }}
                label="Choose Your Profile Photo"
                icon={<CloudDownloadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
              />
            )}

            <Button
              sx={{ marginTop: 2 }}
              variant="contained"
              endIcon={<FilterIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid xs={12} md={8}>
            {isLoading ? <p>Loading....</p> : <DoctorInformation data={data} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DoctorProfilePage;
