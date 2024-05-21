import { USER_ROLE } from "@/constant/role";
import { TDrawerItem, UserRole } from "@/types";
import AddCardIcon from "@mui/icons-material/AddCard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import KeyIcon from "@mui/icons-material/Key";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import MedicationIcon from "@mui/icons-material/Medication";
import Person2Icon from "@mui/icons-material/Person2";
import RateReviewIcon from "@mui/icons-material/RateReview";
export const GenerateDrawerItems = (role: UserRole): TDrawerItem[] => {
  const roleMenus: TDrawerItem[] = [];
  const defaultMenus = [
    {
      title: "Profile",
      path: `${role}/profile`,
      icon: Person2Icon,
    },
    {
      title: "Change Password",
      path: `change-password`,
      icon: KeyIcon,
    },
  ];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: ManageAccountsIcon,
        }
      );
      break;

    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Specialties",
          path: `${role}/specialties`,
          icon: FolderSpecialIcon,
        },
        {
          title: "Doctors",
          path: `${role}/doctors`,
          icon: MedicalInformationIcon,
        },
        {
          title: "Schedules",
          path: `${role}/schedules`,
          icon: BrowseGalleryIcon,
        },
        {
          title: "Appointments",
          path: `${role}/appointments`,
          icon: BookOnlineIcon,
        },
        {
          title: "Reviews",
          path: `${role}/reviews`,
          icon: RateReviewIcon,
        }
      );
      break;

    case USER_ROLE.DOCTOR:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Schedules",
          path: `${role}/schedules`,
          icon: BrowseGalleryIcon,
        },
        {
          title: "Appointments",
          path: `${role}/appointment`,
          icon: BookOnlineIcon,
        }
      );
      break;

    case USER_ROLE.PATIENT:
      roleMenus.push(
        {
          title: "Appointments",
          path: `${role}/appointments`,
          icon: DashboardIcon,
        },
        {
          title: "Prescriptions",
          path: `${role}/prescriptions`,
          icon: MedicationIcon,
        },
        {
          title: "Payment History",
          path: `${role}/payment-history`,
          icon: AddCardIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
