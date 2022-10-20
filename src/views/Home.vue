<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px"
        ><div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <div class="user">
              <img src="../assets/images/user.png" />
              <div class="userInfo">
                <p class="name">Admin</p>
                <p class="access">超级管理员</p>
              </div>
            </div>
            <div class="login_info">
              <p>上次登录的时间: <span>2022-8-12</span></p>
              <p>上次登录的地点: <span>南京</span></p>
            </div>
          </el-card>
          <el-card style="margin-top: 20px; height: 460px">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="型号"> </el-table-column>
              <el-table-column prop="todayBuy" label="今日购买">
              </el-table-column>
              <el-table-column prop="monthBuy" label="本月购买">
              </el-table-column>
              <el-table-column prop="totalBuy" label="总共购买">
              </el-table-column>
            </el-table>
          </el-card></div
      ></el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="grid-content bg-purple-dark">
          <div class="num">
            <el-card
              :body-style="{ display: 'flex', padding: 0 }"
              v-for="item in countData"
              :key="item.name"
            >
              <i
                class="icon"
                :class="`el-icon-${item.icon}`"
                :style="{ background: item.color }"
              ></i>
              <div class="detial">
                <p class="price">￥{{ item.value }}</p>
                <p class="desc">{{ item.name }}</p>
              </div>
            </el-card>
          </div>
          <el-card style="height: 280px">
            <!--折线图 -->
            <div ref="echrats1" style="height: 280px"></div>
          </el-card>
          <div class="graph">
            <el-card style="height: 260px">
              <div ref="echarts2" style="height:260px"></div>
            </el-card>
            <el-card style="height: 260px">
              <div ref="echarts3" style="height:260px"></div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  name: "my-Home",
  data() {
    return {
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  methods: {
    line(data) {
      // 折线图数据
      const { orderData } = data.data;
      const echarts1Option = {};
      echarts1Option.series = [];
      console.log(orderData);
      // x轴数据
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };

      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      echarts1Option.xAxis = xAxisData;
      echarts1Option.yAxis = {};
      echarts1Option.legend = xAxisData;
      const acharts1 = echarts.init(this.$refs.echrats1);
      acharts1.setOption(echarts1Option);
    },
    bar(data){
      const {userData} = data.data;
      const echarts2Option ={
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map(item=> item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
            name:'新增用户',
            data:userData.map(item=> item.new),
            type: 'bar'
            },
            {
              name:'活跃用户',
              data:userData.map(item=> item.active),
              type: 'bar'
            }
        ]
        }
        console.log(echarts2Option);
        const  echarts2 =  echarts.init(this.$refs.echarts2)
        echarts2.setOption(echarts2Option)
    },
    pie(data) {
      const {videoData} = data.data;
      const echarts3Option ={
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data:videoData,
              type:'pie'
            }
          ],
        }
        var echarts3 = echarts.init(this.$refs.echarts3)
        echarts3.setOption(echarts3Option)
    }
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
      this.line(data);
      this.bar(data)
      this.pie(data)
      
    });
  },
};
</script>

<style lang="less" scoped>
p {
  padding: 0;
  margin: 0;
}
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
.login_info {
  p {
    margin: 0;
    padding: 0;
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      margin-left: 30px;
    }
  }
  .name {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .access {
    color: #999;
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 80px;
  }
  .detial {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      text-align: center;
      color: #999;
    }
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
    margin-top: 20px;
  }
}
</style>>

