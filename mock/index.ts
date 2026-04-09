// import Mock from "mockjs";

import request from "@/utils/request.ts";
import MockAdapter from "axios-mock-adapter"; //引入axios-mock-adapter
const Mock = new MockAdapter(request, { delayResponse: 1000 }); //创建MockAdapter实例，传入axios实例

import userMock from "./user";
import brandsMock from "./brands";
import productsMock from "./products";

const mocks = [...userMock, ...brandsMock, ...productsMock];

~(function mockMethods() {
  mocks.forEach((mockItem) => {
    if (mockItem.method.toUpperCase() === "GET") {
      Mock.onGet(mockItem.url).reply(mockItem.response);
    } else if (mockItem.method.toUpperCase() === "POST") {
      Mock.onPost(mockItem.url).reply(mockItem.response);
    }else if (mockItem.method.toUpperCase() === "DELETE") {
      Mock.onDelete(mockItem.url).reply(mockItem.response);
    }
  });
})();
