import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { doctorServices } from "./doctor.services";

const updateDoctorProfile = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await doctorServices.updateDoctorInfo(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export const doctorControllers = {
  updateDoctorProfile,
};
