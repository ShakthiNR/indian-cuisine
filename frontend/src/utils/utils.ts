export const buildFilter = (data: Array<string>) => {
  return [
    {
      key: "",
      text: "All",
    },
    ...data.map((item) => {
      return {
        key: item,
        text: item,
      };
    }),
  ];
};

export const defaultIngredients = [
  { key: "", text: "All" },
  { key: "Rice flour", text: "Rice flour" },
  { key: "coconut", text: "coconut" },
  { key: "jaggery", text: "jaggery" },
  { key: "banana", text: "banana" },
  { key: "ghee", text: "ghee" },
];
