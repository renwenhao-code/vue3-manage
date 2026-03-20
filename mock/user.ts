export const tokens = new Map();
tokens.set("admin", "admin-token");
tokens.set("editor", "editor-token");

export const users = new Map();
users.set("admin-token", {
  roles: ["admin"],
  introduction: "我是超级管理员",
  avatar: "../public/dog.gif",
  
  name: "超级管理员",
  password: "123456",
});

users.set("editor-token", {
  roles: ["editor"],
  introduction: "我是普通编辑",
  avatar: "../public/dog.gif",
  name: "普通编辑",
  password: "1234567",
});
