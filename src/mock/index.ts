import Mock from "mockjs";
import { userInfo } from "os";
Mock.setup({
  timeout: "200-600", //模拟延时
});

Mock.mock("/api/login", "post", (req: any) => {
  const { name, password } = JSON.parse(req.body);
  let token = "";
  if (name === "admin" && password === "123456") {
    token = Mock.Random.guid();
  } else if (name == "user" && password == "123456") {
    token = Mock.Random.string(32);
  } else {
    token = `mock-token-${name}-${Date.now()}`;
  }
  return {
    code: 200,
    message: "登录成功",
    data: {
      token,
      userInfo: {
        name,
        password
      }
    },
  };
});
