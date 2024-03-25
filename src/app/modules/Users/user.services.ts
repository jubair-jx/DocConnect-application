import { fileUploader } from "../../../helpers/sendUploader";

const createAdminIntoDB = async (req: any) => {
  // console.log("file", req.file);
  // console.log("data", req.body.data);

  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    // console.log("uploaded", uploadToCloudinary);
    req.body.data.admin.profilePhoto = uploadToCloudinary?.secure_url;
    console.log(req.body.data);
  }
  // const hashPassword = await bcrypt.hash(data.password, 12);

  // const userData = {
  //   email: data.admin.email,
  //   password: hashPassword,
  //   role: UserRole.ADMIN,
  // };

  // const result = await prisma.$transaction(async (tx) => {
  //   await tx.user.create({
  //     data: userData,
  //   });
  //   const createAdmin = await tx.admin.create({
  //     data: data.admin,
  //   });

  //   return createAdmin;
  // });
  // return result;
};

export const userServices = {
  createAdminIntoDB,
};
