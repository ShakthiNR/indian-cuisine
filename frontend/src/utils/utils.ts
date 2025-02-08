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
