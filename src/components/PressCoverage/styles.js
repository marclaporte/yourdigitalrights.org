import { container } from "../../styles/layout";
import { themeBg } from "../../styles/theme";

export default (theme) => ({
  container: {
    backgroundColor: "#f2f2f2",
    position: "relative",
    paddingTop: "40px",
    textAlign: "center",
  },
  inner: {
    display: 'flex',
    overflow: 'hidden',
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    paddingBottom: "40px",
  },
  gridList: {
    width: "80%",
  },
  pressLogo: {
    objectFit: "contain",
  },
});
