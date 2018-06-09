import { Component } from "react";
import Downshift from "downshift";
import { FormattedMessage } from "react-intl";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import fetchSheetData from "../utils/sheets";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  searchInputWrapper: {
    padding: "6px 16px"
  },
  label: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: "1px"
  },
  form: {
    position: "relative",
    height: "44px"
  },
  results: {
    position: "absolute",
    width: "100%",
    zIndex: 1000
  },
  searchIcon: {
    marginRight: "16px"
  },
  list: {
    padding: 0
  }
});

class Form extends Component {
  state = {
    searchResults: [],
    companyNameSearch: "",
    companiesLoaded: false
  };

  async componentDidMount() {
    const companies = fetchSheetData();
    this.setState({ companies });
    await companies;
    this.setState({ companiesLoaded: true });
  }

  handleInput = e => {
    this.searchCompanies(e.target.value);
    this.setState({
      companyNameSearch: e.target.value
    });
  };

  async searchCompanies(search) {
    let searchResults = [];

    if (search) {
      const companies = await this.state.companies;
      searchResults = companies
        .filter(company => {
          return company.name.toLowerCase().match(search.toLowerCase());
        })
        .slice(0, 5);
    } else {
      searchResults = [];
    }

    this.setState({
      searchResults
    });
  }

  onSelected = company => {
    this.props.onCompanySelected(company);
    this.setState({
      searchResults: [],
      companyNameSearch: company.name
    });
  };

  renderInput = InputProps => {
    const { classes, companies } = this.props;

    return (
      <FormattedMessage
        id="companyPlaceholder"
        defaultMessage="Search for a company"
      >
        {label => (
          <div>
            <InputLabel htmlFor="companyNameSearch" className={classes.label}>
              {label}
            </InputLabel>
            <Input
              {...InputProps}
              id="companyNameSearch"
              onInput={this.handleInput}
              value={this.state.companyNameSearch}
              startAdornment={
                <InputAdornment position="start" className={classes.searchIcon}>
                  <Icon>search</Icon>
                </InputAdornment>
              }
              disableUnderline={true}
              placeholder={label}
              fullWidth={true}
              className={classes.searchInputWrapper}
              autoComplete="off"
              autoFocus
            />
          </div>
        )}
      </FormattedMessage>
    );
  };

  renderSuggestion = ({
    result,
    i,
    highlightedIndex,
    selectedItem,
    itemProps
  }) => {
    const isHighlighted = highlightedIndex === i;
    const isSelected = selectedItem && selectedItem.name === result.name;

    return (
      <MenuItem
        button
        key={i}
        selected={isHighlighted}
        dense={true}
        {...itemProps}
      >
        <img
          role="presentation"
          src={`https://api.faviconkit.com/${result.url}/24`}
          width={24}
          height={24}
        />
        <ListItemText primary={result.name} />
      </MenuItem>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <form id="searchForm" className={classes.form}>
        <Downshift onSelect={this.onSelected}>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex
          }) => (
            <div>
              <Paper className={classes.results}>
                {this.renderInput(getInputProps())}
                {isOpen &&
                  this.state.companyNameSearch && (
                    <div>
                      {this.state.searchResults.length ? (
                        <MenuList className={classes.list}>
                          {this.state.searchResults.map((result, i) =>
                            this.renderSuggestion({
                              result,
                              i,
                              itemProps: getItemProps({ item: result }),
                              highlightedIndex,
                              selectedItem
                            })
                          )}
                        </MenuList>
                      ) : this.state.companiesLoaded ? (
                        <MenuItem>
                          <ListItemText>
                            <FormattedMessage
                              id="noResults"
                              defaultMessage="No results"
                            />
                          </ListItemText>
                        </MenuItem>
                      ) : (
                        <MenuItem>
                          <ListItemText>
                            <FormattedMessage
                              id="loadingCompanies"
                              defaultMessage="Loading companies"
                            />
                          </ListItemText>
                        </MenuItem>
                      )}
                    </div>
                  )}
              </Paper>
            </div>
          )}
        </Downshift>
      </form>
    );
  }
}
export default withStyles(styles)(Form);
