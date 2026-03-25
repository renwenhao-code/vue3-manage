import Mock from "mockjs";

const brands = Mock.mock({
  "brands|4": [
    {
      "name|+1": ["华为", "小米", "OPPO", "苹果"],
      // 先生成日销量
      "dailySales|500-1000": 1,
      // 月销量基于日销量计算
      monthlySales: function (this: any): number {
        // 取整并添加 ±10% 波动
        const base = this.dailySales * 30;
        const factor = 0.9 + Math.random() * 0.2; // 0.9～1.1
        return Math.round(base * factor);
      },
      // 年销量基于日销量计算
      annualSales: function (this: any): number {
        const base = this.dailySales * 365;
        const factor = 0.9 + Math.random() * 0.2; // 0.9～1.1
        return Math.round(base * factor);
      },
    },
  ],
});

const brandsMock: Array<{ url: string; method: string; response: any }> = [
  {
    url: "/api/brands",
    method: "get",
    response: (config: any) => {
      return [
        200,
        {
          code: 200,
          data: brands,
          message: "获取品牌数据成功",
        },
      ];
    },
  },
];

export default brandsMock;
