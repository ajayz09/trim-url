import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";

import {
  getWelcomeMessage,
  getShortenedURL,
} from "../../services/ShortnerService";

import "./Shortener.scss";
import { getBaseUrl } from "../../services/BaseUrl";

export class Shortener extends Component {
  state = {
    url: "",
    urlShortened: false,
    error: false,
    shortURL: "",
    data: {},
  };

  componentDidMount() {
    getWelcomeMessage().then((response) => {});
  }

  handleChange = (event) => {
    this.state.url = event.target.value;
    this.setState({ url: event.target.value });
  };

  navigateToURL = (url) => {
    window.location.href = url;
  };

  shortenURL = () => {
    getShortenedURL(this.state.url)
      .then((response) => {
        console.log("Response--- ", response);

        this.setState({
          urlShortened: true,
          error: false,
          data: response,
          shortURL: getBaseUrl() + "/" + response.url,
        });
      })
      .catch((error) => {
        console.log("Error--- ", error.response.data);
        this.setState({
          urlShortened: true,
          error: true,
          data: error.response.data,
        });
      });
  };

  render() {
    return (
      <Container maxWidth="sm">
        <div className="shortener-heading">URL Shortener</div>
        <TextField
          className="mt-4 w-100 url-text"
          id="outlined-basic"
          placeholder="Enter URL to shorten"
          onChange={this.handleChange}
          InputProps={{
            endAdornment: (
              <Button
                disabled={this.state.url.length == 0}
                onClick={this.shortenURL}
                variant="text"
              >
                GO
              </Button>
            ),
          }}
        />
        <div className="my-2">
          {this.state.urlShortened && !this.state.error && (
            <Alert severity="info">
              <p>Your shortened URL is below</p>

              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  this.navigateToURL(this.state.shortURL);
                }}
              >
                {this.state.shortURL}
              </Link>
            </Alert>
          )}

          {this.state.urlShortened && this.state.error && (
            <Alert severity="error">
              <p>{this.state.data.detail}</p>
            </Alert>
          )}
        </div>
      </Container>
    );
  }
}
