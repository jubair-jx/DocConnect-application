import { TDrawerItem } from "@/types";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { usePathname } from "next/navigation";
type TProps = {
  item: TDrawerItem;
};

const SideBarItems = ({ item }: TProps) => {
  const linkPathName = `/dashboard/${item.path}`;
  const pathName = usePathname();

  return (
    <Link href={linkPathName}>
      <ListItem
        sx={{
          ...(pathName === linkPathName
            ? {
                borderRight: "4px solid #10439F",
                "& svg": {
                  color: "#10439F",
                },
              }
            : {}),
        }}
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideBarItems;
