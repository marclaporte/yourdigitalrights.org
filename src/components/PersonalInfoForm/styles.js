const Style = (theme) => ({
  formContainer: {
    position: "relative",
    maxWidth: "777px",
    margin: "-130px auto 60px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      padding: "60px",
      margin: "-180px auto 50px",
    },
  },
  formButton: {
    marginTop: "30px",
  },
  formControl: {
    marginTop: theme.spacing(1),
  },
  group: {
    margin: theme.spacing(1),
    flexDirection: "row",
  },
  introText: {
    paddingBottom: "500px",
  }
});

export default Style;