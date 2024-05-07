import { USER_ROLE } from "@/constant/role";
import { TDrawerItem, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
export const GenerateDrawerItems = (role: UserRole): TDrawerItem[] => {
  const rolesMenus: TDrawerItem[] = [];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      rolesMenus.push(
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
  }

  return [...rolesMenus];
};
