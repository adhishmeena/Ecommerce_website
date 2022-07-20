import bcrypt from "bcryptjs"; // npm i bcryptjs (It is better than bcrypt )

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Pritish Patra",
    email: "patra@dxc.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Yug Gupta",
    email: "Yug@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
