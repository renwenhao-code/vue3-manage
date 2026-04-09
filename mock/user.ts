export const tokens = new Map();
tokens.set("admin", "admin-token");
tokens.set("editor", "editor-token");

export const users = new Map();
users.set("admin-token", {
  roles: ["admin"],
  introduction: "我是超级管理员",
  avatar:
    "https://s1.aigei.com/src/img/gif/6a/6a49e68067f449838e0cd4c842d06b51.gif?e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:JHEdLSp6Xg9UwKY4BFQrRKRIIA0=",

  name: "超级管理员",
  password: "123456",
});

users.set("editor-token", {
  roles: ["editor", "user"],
  introduction: "我是普通编辑",
  avatar:
    "https://s1.aigei.com/src/img/gif/6a/6a49e68067f449838e0cd4c842d06b51.gif?e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:JHEdLSp6Xg9UwKY4BFQrRKRIIA0=",
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
  {
    url: "/api/user/list",
    method: "GET",
    response: (config: any) => {
      const userList = [...users.values()].map((item, index) => {
        item.token = [...users.keys()][index];
        return item;
      });
      
      const token = config.headers?.Authorization;
      if (users.has(token)) {
        return [
          200,
          {
            code: 200,
            message: "获取用户信息成功",
            data: userList,
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
  {
    url: "/api/user/deleteUserByToken",
    method: "DELETE",
    response: (config: any) => {
      const token = config.headers?.Authorization;
      const deleteToken = config.params?.token;
      users.delete(deleteToken);
      if (users.has(token)) {
        return [
          200,
          {
            code: 200,
            message: "删除成功",
          },
        ];
      } else {
        return [
          400,
          {
            code: 400,
            message: "删除失败",
          },
        ];
      }
    },
  },
];

export default userMock;
