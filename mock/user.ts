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
  // avatar: "../public/dog.gif",
  avatar: "@/assets/user/dog.gif",
  name: "普通编辑",
  password: "1234567",
});
// 将mock api统一暴露出去
const userMock: Array<{ url: string; method: string; response: any }> = [
  {
    url: "/api/user/login",
    method: "POST",
    response: (config: any) => {
      let { name, password } = JSON.parse(config.data);
      if (
        tokens.has(name) &&
        users.get(tokens.get(name)).password === password
      ) {
        return [
          200,
          {
            code: 200,
            message: "登录成功",
            data: {
              token: tokens.get(name),
              userInfo: users.get(tokens.get(name)),
            },
          },
        ];
      } else {
        return [
          400,
          {
            code: 400,
            message: "用户名或密码错误",
          },
        ];
      }
    },
  },
  {
    url: "/api/user/info",
    method: "GET",
    response: (config: any) => {
      const token = config.headers?.Authorization;
      if (users.has(token)) {
        return [
          200,
          {
            code: 200,
            message: "获取用户信息成功",
            data: users.get(token),
          },
        ];
      } else {
        return [
          400,
          {
            code: 400,
            message: "获取用户信息失败",
          },
        ];
      }
    },
  },
];

export default userMock;
