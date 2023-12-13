/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Markdown } from "tiptap-markdown";
import { Editor as NovelEditor } from "novel";

const classes = {
  editor: {
    "& .ProseMirror": {
      padding: 12
    },
    "& .mention": {
      backgroundColor: "grey",
      paddingLeft: 6,
      paddingRight: 6,
      paddingBottom: 3,
      borderRadius: 12,
      fontWeight: 300,
      color: "#000",
      fontSize: 12,
      textDecoration: "none"
    },
    " & .collaboration-cursor-name-label": {
      maxWidth: 200,
      borderRadius: 2,
      padding: "4px 5px",
      fontFamily: "Product Sans Regular",
      fontWeight: 300
    },
    // remove drag and drop
    "& .drag-handle": {
      display: "none"
    },
    "& h1": { fontSize: 32 },
    "& h2": { fontSize: 22 },
    "& h3": { fontSize: 14 },
    "& h4": { fontSize: 14 },
    "& h5": { fontSize: 12 },
    "& h6": { fontSize: 10 }
  }
};

const Home = () => {
  return (
    <NovelEditor
      css={classes.editor}
      defaultValue="<h1>Hello</h1>"
      editorProps={{
        editable: () => false
      }}
      disableLocalStorage
      extensions={[
        Markdown.configure({
          html: false,
          transformCopiedText: true,
          transformPastedText: true
        })
      ]}
    />
  );
};

export default Home;
