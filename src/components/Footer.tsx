/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Link, Stack, Typography } from "@mui/material";
import { LAYOUT_CONTENT_PADDING } from "../utils/constants";
import { Theme } from "@emotion/react";

const links = [
  {
    label: "GitHub",
    url: "https://github.com/tiavina-mika"
  },
  {
    label: "LInkedIn",
    url: "https://www.linkedin.com/in/tiavina-michael-ralainirina/"
  },
  {
    label: "Youtube",
    url: "https://www.youtube.com/channel/UC0CfOprE7AOXQqeFhS2XUIQ"
  }
];

const classes = {
  footer: (theme: Theme) => ({
    borderTop: "1px solid " + theme.palette.grey[300],
    padding: `12px ${LAYOUT_CONTENT_PADDING}px`
  })
};

const Footer = () => {
  return (
    <div className="flexRow spaceBetween stretchSelf" css={classes.footer}>
      <Stack spacing={1} direction="row" flex={1}>
        {links.map((link, index) => (
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            key={link.label + index}
          >
            <Link href={link.url} variant="h4">
              {link.label}
            </Link>
            {links.length - 1 !== index && <Typography>|</Typography>}
          </Stack>
        ))}
      </Stack>
      <div className="stretchSelf flexCenter flex1">
        <Typography variant="h4" className="grey800">
          By Tiavina Michael Ralainirina
        </Typography>
      </div>
      <div className="flexCenter stretchSelf flex1 flexEnd">
        <Typography className="flexRow center grey800">
          <span css={{ marginRight: 2 }}>©</span>
          <span>{new Date().getFullYear()}</span>
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
