import { Outlet } from "react-router-dom";
import Wrapper from "../ui/wrapper";
import Header from "./header";

export default function MainLayout() {
  return (
    <Wrapper>
      <Header />
      <Outlet/>
    </Wrapper>
  );
}
