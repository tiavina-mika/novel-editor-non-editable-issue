/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Typography, useTheme } from "@mui/material";
import { LAYOUT_CONTENT_PADDING } from "../utils/constants";
import Footer from "../components/Footer";
import { Theme } from "@emotion/react";
import { useState } from "react";
import TextEditorField from "../components/form/fields/TextEditorField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Form from "../components/form/Form";
import { css } from "@emotion/css";

const mentions = [
  { label: "Lea Thompson", value: "xxxx1" },
  { label: "Cyndi Lauper", value: "xxxx2" },
  { label: "Tom Cruise", value: "xxxx3" },
  { label: "Madonna", value: "xxxx4" },
  { label: "Jerry Hall", value: "xxxx5" },
  { label: "Joan Collins", value: "xxxx6" },
  { label: "Winona Ryder", value: "xxxx7" },
  { label: "Christina Applegate", value: "xxxx8" },
  { label: "Alyssa Milano", value: "xxxx9" },
  { label: "Molly Ringwald", value: "xxxx10" },
  { label: "Ally Sheedy", value: "xxxx11" },
  { label: "Debbie Harry", value: "xxxx12" },
  { label: "Olivia Newton-John", value: "xxxx13" },
  { label: "Elton John", value: "xxxx14" },
  { label: "Michael J. Fox", value: "xxxx15" },
  { label: "Axl Rose", value: "xxxx16" },
  { label: "Emilio Estevez", value: "xxxx17" },
  { label: "Ralph Macchio", value: "xxxx18" },
  { label: "Rob Lowe", value: "xxxx19" },
  { label: "Jennifer Grey", value: "xxxx20" },
  { label: "Mickey Rourke", value: "xxxx21" },
  { label: "John Cusack", value: "xxxx22" },
  { label: "Matthew Broderick", value: "xxxx23" },
  { label: "Justine Bateman", value: "xxxx24" },
  { label: "Lisa Bonet", value: "xxxx25" }
];

export const problemSchema = z.object({
  description: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
});

type IProblemInput = z.infer<typeof problemSchema>;

const classes = {
  root: {
    minHeight: "100vh"
  },
  content: {
    padding: LAYOUT_CONTENT_PADDING
  },
  header: (theme: Theme) => ({
    borderBottom: "1px solid " + theme.palette.grey[300],
    padding: `16px ${LAYOUT_CONTENT_PADDING}px`
  }),
  textEditorMenu: css({
    bottom: 70
  }),
  button: (theme: Theme) =>
    css({
      backgroundColor: theme.palette.primary.main
    })
};

const Home = () => {
  const theme = useTheme();
  const form = useForm<IProblemInput>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      description: "<p>hello</p>"
    }
  });

  const { handleSubmit } = form;

  const onSubmitHandler = (values: IProblemInput) => {
    console.log("values", values);
  };

  return (
    <div className="flexColumn spaceBetween" css={classes.root}>
      <div className="flexColumn stretchSelf flex1">
        <div css={classes.header} className="stretchSelf">
          <Typography variant="h3">Mik.</Typography>
        </div>
        <div css={classes.content}>
          <div css={{ marginTop: 4 }}>
            <Typography className="grey800" css={{ fontSize: 14 }}>
              Novel – AI-powered Notion-style editor
            </Typography>
          </div>
        </div>
        <div className="flexColumn stretchSelf flex1" css={{ padding: 12 }}>
          <Form
            form={form}
            onSubmit={handleSubmit(onSubmitHandler)}
            primaryButtonText="Save"
            buttonFullWidth
            contentClassName="flexColumn flex1"
            buttonClassName={classes.button(theme)}
          >
            <TextEditorField
              className="flexColumn spaceBetween stretchSelf flex1"
              name="description"
              label="Description"
              placeholder="Provide as much information as possible. This field has only one limit, yours."
              mentions={mentions}
              menuClassName={classes.textEditorMenu}
            />
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
