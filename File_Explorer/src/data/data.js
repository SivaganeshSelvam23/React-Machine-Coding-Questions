const data = [
  {
    id: 1,
    name: "node_modules",
    isFolder: true,
    children: [
      {
        id: 16,
        name: "bin",
        isFolder: false,
        children: [],
      },
    ],
  },
  {
    id: 2,
    name: "public",
    isFolder: true,
    children: [
      {
        id: 3,
        name: "index.html",
        isFolder: false,
        children: [],
      },
    ],
  },
  {
    id: 4,
    name: "src",
    isFolder: true,
    children: [
      {
        id: 5,
        name: "data",
        isFolder: true,
        children: [{ id: 6, name: "data.js", isFolder: false, children: [] }],
      },
      {
        id: 7,
        name: "components",
        isFolder: true,
        children: [
          { id: 8, name: "list_component.jsx", isFolder: false, children: [] },
        ],
      },
      { id: 9, name: "App.jsx", isFolder: false, children: [] },
      { id: 10, name: "App.css", isFolder: false, children: [] },
      { id: 11, name: "index.css", isFolder: false, children: [] },
      { id: 12, name: "main.jsx", isFolder: false, children: [] },
    ],
  },
  { id: 13, name: "package.json", isFolder: false, children: [] },
  { id: 14, name: ".gitignore", isFolder: false, children: [] },
  { id: 15, name: "Readme.md", isFolder: false, children: [] },
];

export default data;
