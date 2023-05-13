type ButtonActionsType = {
  name: string;
  warn: boolean;
};

export const ButtonActions: ButtonActionsType[] = [
  {
    name: "Add",
    warn: false,
  },
  {
    name: "Delete One",
    warn: false,
  },
  {
    name: "Delete All",
    warn: false,
  },
  {
    name: "Publish",
    warn: true,
  },
];
