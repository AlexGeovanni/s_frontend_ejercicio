import { HomeIcon } from "@/icons";
import { Link } from "react-router-dom";

export default function Favorites() {
  return (
    <>
      <header>
        <Link to="/">
          <span>
            <HomeIcon />
          </span>
          Volver
        </Link>
      </header>
    </>
  );
}
