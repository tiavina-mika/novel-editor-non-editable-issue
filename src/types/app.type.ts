import { ReactNode } from "react";

export interface ISelectOption<V = any> {
  label: string;
  value: V;
  icon?: ReactNode | string;
}

export interface ITextEditorCollaborationUser {
  name: string;
  color: string;
}
