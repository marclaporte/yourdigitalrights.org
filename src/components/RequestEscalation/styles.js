const Style = (theme) => ({
  root: {
    paddingBottom: "80px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    textAlign: "left",
  },
  container: {
    paddingTop: "30px",
    maxWidth: "860px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 30px 0px",
      width: "100%",
    },
  },
  formContainer: {
    maxWidth: "777px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
  },
  formButton: {
    marginTop: "2rem",
    borderRadius: "24px 24px 24px 24px",
  },
});

export default Style;
