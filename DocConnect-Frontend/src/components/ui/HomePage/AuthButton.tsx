import { getUserInfo, isLoggedIn, removedUser } from "@/services/auth-service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const userInfo = getUserInfo();
  const loggedIn = isLoggedIn();
  const router = useRouter();
  const logOutHandler = () => {
    removedUser();
    router.refresh();
  };
  return (
    <>
      {userInfo?.email ? (
        <Button onClick={logOutHandler} variant="contained" color="secondary">
          Logout{" "}
        </Button>
      ) : (
        <Button variant="contained" component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
}
