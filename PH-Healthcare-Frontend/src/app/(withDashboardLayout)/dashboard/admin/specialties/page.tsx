import RUModal from "@/components/shared/Modal/RUModal";
import { Stack, TextField } from "@mui/material";

const SpecialtiesPage = () => {
  // onClick={() => setIsModalOpen(true)}
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <button className="px-3 py-2 text-sm rounded-md bg-blue-500 text-white">
        Create Specialty
      </button>
      <RUModal />
      {/* <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} /> */}
      <TextField size="small" placeholder="Search Specialist" />
    </Stack>
  );
};

export default SpecialtiesPage;
