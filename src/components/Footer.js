
import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import GitHubButton from 'react-github-btn';

export default (props) => {
  const currentYear = moment().get("year");
  const showSettings = props.showSettings;

  const toggleSettings = (toggle) => {
    props.toggleSettings(toggle);
  }

  return (
    <div>
      { showSettings ? (
        <Card className="theme-settings">
          <Card.Body className="pt-4">
            <Button className="theme-settings-close" variant="close" size="sm" aria-label="Close" onClick={() => { toggleSettings(false) }} />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="m-0 mb-1">Give us a lucky star <span role="img" aria-label="gratitude">🙏</span></p>
              <GitHubButton href="https://github.com/themesberg/volt-react-dashboard" data-size="large" data-show-count="true" aria-label="Star themesberg/volt-react-dashboard on GitHub">Star</GitHubButton>
            </div>
          </Card.Body>
          <Card.Body className="pt-4">
          <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://themesberg.com/about" target="_blank">
                  About
              </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://themesberg.com/themes" target="_blank">
                  Themes
              </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://themesberg.com/blog" target="_blank">
                  Blog
              </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://themesberg.com/contact" target="_blank">
                  Contact
              </Card.Link>
              </li>
            </ul>
          </Card.Body>
        </Card>
      ) : (
          <Card className="theme-settings theme-settings-expand" onClick={() => { toggleSettings(true) }}>
            <Card.Body className="p-3 py-2">
              <span className="fw-bold h6"><FontAwesomeIcon icon={faCogs} className="me-1 fs-7" /> Credits</span>
            </Card.Body>
          </Card>
        )}
      <footer className="footer section py-2">
        <Row>
          <Col xs={12} lg={12}>
            <p className="mb-0 text-center text-xl-center">
              Copyright © 2019-{`${currentYear} `}
              <Card.Link href="https://themesberg.com" target="_blank" className="text-blue text-decoration-none fw-normal">
                Themesberg
            </Card.Link>
            </p>  
          </Col>
        </Row>
      </footer>
    </div>
  );
};
