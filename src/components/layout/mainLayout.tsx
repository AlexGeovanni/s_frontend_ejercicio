import { Outlet } from "react-router-dom";
import Wrapper from "../ui/wrapper";
export default function MainLayout() {
  return (
    <Wrapper>
      <Outlet/>
    </Wrapper>
  );
}
