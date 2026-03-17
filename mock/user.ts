export const tokens = new Map();
tokens.set("admin", "admin-token");
tokens.set("editor", "editor-token");

export const users = new Map();
users.set("admin-token", {
  roles: ["admin"],
  introduction: "I am a super administrator",
  avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  name: "Super Admin",
  password: "123456",
});

users.set("editor-token", {
  roles: ["editor"],
  introduction: "I am an editor",
  avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  name: "Normal Editor",
  password: "1234567",
});
