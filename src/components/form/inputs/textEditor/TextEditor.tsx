/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme, jsx } from "@emotion/react";

import { EditorOptions, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { css, cx } from "@emotion/css";
import { FormHelperText, Typography, useTheme } from "@mui/material";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Editor as NovelEditor } from "novel";

import { Markdown } from "tiptap-markdown";
import {
  ISelectOption,
  ITextEditorCollaborationUser
} from "../../../../types/app.type";
import getSuggestion from "./mention/suggestion";
import { getTextEditorInitialUser } from "../../../../utils/textEditor.utils";
import { LAYOUT_CONTENT_PADDING } from "../../../../utils/constants";

const classes = {
  editorRoot: (theme: Theme) => ({
    [theme.breakpoints.down("md")]: {
      paddingBottom: 90
    }
  }),
  editor: (theme: Theme) => ({
    "& .ProseMirror": {
      padding: 12
    },
    "& .mention": {
      backgroundColor: theme.palette.grey[200],
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
  }),
  input: (theme: Theme, editable = true, placeholder: string | undefined) =>
    css({
      borderRadius: 6,
      border: editable ? "1px solid " + theme.palette.grey[800] : "none",
      paddingLeft: editable ? 16 : 0,
      paddingRight: editable ? 16 : 0,
      minHeight: 150,
      "& p.is-editor-empty:first-child::before": {
        content: `"${placeholder}"`,
        float: "left",
        height: 0,
        pointerEvents: "none",
        color: theme.palette.grey[300],
        fontFamily: "Product Sans Regular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "157.143%" /* 157.143% */
      }
    }),
  label: (theme: Theme) => ({
    pointerEvents: "none" as const,
    color: theme.palette.grey[800],
    fontFamily: "Product Sans Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 1,
    backgroundColor: "#fff",
    zIndex: 100,
    padding: "4px 3px",
    marginLeft: 12,
    top: -8
  }),
  menu: (theme: Theme) => ({
    [theme.breakpoints.down("md")]: {
      position: "absolute" as const,
      bottom: 0,
      left: -LAYOUT_CONTENT_PADDING,
      right: -LAYOUT_CONTENT_PADDING,
      maxWidth: `calc(100vw + ${LAYOUT_CONTENT_PADDING / 2}px)`
    }
  })
};

const CustomMention = Mention.extend({
  // use a link (with url) instead of the default span
  renderHTML({ node, HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(
        { href: `/user/${HTMLAttributes["data-id"]}` },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      this.options.renderLabel({
        options: this.options,
        node
      })
    ];
  },
  // the attribute should be user id for exemple
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id?.value) {
            return {};
          }

          return {
            "data-id": attributes.id.value
          };
        }
      }
    };
  }
});

const ydoc = new Y.Doc();
const provider = new WebrtcProvider("workspace-04", ydoc);

const CustomCollaborationCursor = CollaborationCursor.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      render: (user: ITextEditorCollaborationUser) => {
        const cursor = document.createElement("div");

        cursor.classList.add("collaboration-cursor-name-container");

        const label = document.createElement("span");

        label.classList.add("collaboration-cursor-name-label");
        label.setAttribute("style", `background-color: ${user.color}`);
        label.insertBefore(document.createTextNode(user.name), null);
        cursor.insertBefore(label, null);

        return cursor;
      }
    };
  }
});

export type TextEditorProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
  mentions?: ISelectOption[];
  menuClassName?: string;
} & Partial<EditorOptions>;

const TextEditor = ({
  placeholder,
  label,
  error,
  onChange,
  className,
  value,
  mentions,
  menuClassName,
  editable = true,
  ...editorOptions
}: TextEditorProps) => {
  const theme = useTheme();
  const currentUser = getTextEditorInitialUser(theme); // simulate user from db

  // useEffect(() => {
  //   if (!editor?.chain().focus().user) return;
  //   if (editor && currentUser) {
  //     editor.chain().focus().user(currentUser).run();
  //   }
  // }, [editor, currentUser]);

  const handleChange = (editor: any) => {
    const html = editor.getHTML();
    onChange?.(html);
  };

  if (!editable) {
    return (
      <NovelEditor
        css={classes.editor}
        defaultValue={value}
        className={className}
        editorProps={{
          editable: () => editable
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
  }

  return (
    <div
      className={cx("positionRelative flexColumn", className)}
      css={classes.editorRoot}
    >
      <div className="positionRelative stretchSelf">
        {label && (
          <Typography css={classes.label} className="positionAbsolute">
            {label}
          </Typography>
        )}
        <NovelEditor
          css={classes.editor}
          defaultValue={value}
          onDebouncedUpdate={handleChange}
          disableLocalStorage
          editorProps={{
            attributes: {
              class: classes.input(theme, editable, placeholder)
            },
            ...editorOptions
          }}
          extensions={[
            Markdown.configure({
              html: true,
              transformCopiedText: true,
              transformPastedText: true
            }),
            Link.configure({
              HTMLAttributes: {
                // Change rel to different value
                // Allow search engines to follow links(remove nofollow)
                rel: "noopener noreferrer",
                // Remove target entirely so links open in current tab
                target: null
              }
            }),
            StarterKit.configure({
              bulletList: {
                keepMarks: true,
                keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
              },
              orderedList: {
                keepMarks: true,
                keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
              },
              history: false // important because history will now be handled by Y.js
            }),
            CustomMention.configure({
              HTMLAttributes: {
                class: "mention"
              },
              renderLabel({ options, node }) {
                return `${options.suggestion.char}${
                  node.attrs.label ?? node.attrs.id.label
                }`;
              },
              suggestion: getSuggestion(mentions)
            }),
            // colaboration
            CustomCollaborationCursor.configure({
              provider,
              user: currentUser
            }),
            Collaboration.configure({
              document: ydoc
            })
          ]}
        />
        {error && (
          <FormHelperText error css={{ paddingTop: 4, paddingBottom: 4 }}>
            {error}
          </FormHelperText>
        )}
        {/* number of user online */}
        {/* {editor && (
          <div css={{ paddingTop: 6, padddingBottom: 6 }}>
            <Typography variant="body1">
              {editor.storage.collaborationCursor?.users.length} user
              {editor.storage.collaborationCursor?.users.length === 1
                ? ""
                : "s"}{" "}
              online
            </Typography>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TextEditor;
