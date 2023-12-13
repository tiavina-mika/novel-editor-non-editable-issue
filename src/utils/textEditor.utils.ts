import { Theme } from "@emotion/react";

import { ITextEditorCollaborationUser } from "../types/app.type";

const names = [
  "Tiavina Michael Ralainirina",
  "Tanteraka Mario",
  "Miora Sarobidy Razainirina",
  "Koloina",
  "Tatiana Maria",
  "Tojo Heritiana",
  "Jean Paul Valiha",
  "Tafita",
  "Manitra Raz",
  "Jean Rolland",
  "Andrianampoinimerina",
  "Radama I",
  "Radama II",
  "Rasoherina",
  "Jean Ralaimongo",
  "Candy Mitia",
  "Albert Einstein",
  "J.R.R Tolkien",
  "H.P. Lovecraft",
  "Abraham Lincoln",
  "Soren Kiekergaard",
  "John Cusack",
  "Isaac Newton",
  "Clark Kent",
  "Monkey D. Luffy"
];

const getRandomElement = (list: string[]): string => {
  return list[Math.floor(Math.random() * list.length)];
};

const getRandomName = () => getRandomElement(names);

export const getTextEditorInitialUser = (
  theme: Theme
): ITextEditorCollaborationUser => {
  const colors = [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.success.main,
    theme.palette.info.main,
    theme.palette.warning.main
  ];

  return {
    name: getRandomName(),
    color: getRandomElement(colors)
  };
};
