import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { GET } from "../../utilities/ApiProvider";

const StateCard = () => {
  const data = {
    series: [44, 55],
    options: {
      chart: {
        type: "pie",
      },
      colors: ["#ff0000", "#ff7500"],
      labels: ["Red", "Ornage"],
    },
  };

  const selector = useSelector((state) => state);
  const [user, setUser] = useState({});
  const [datas, setDatas] = useState("");

  useEffect(() => {
    if (selector) {
      setUser(selector?.user?.user);
    }
  }, [selector]);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  const getData = async () => {
    const res = await GET("admin/home", {
      authorization: `bearer ${user?.verificationToken}`,
    });
    setDatas(res?.data);
  };

  return (
    <Box
      gap={"20px"}
      display={"flex"}
      flexDirection={{ base: "column", md: "column", lg: "row" }}
      width={"100%"}
      justifyContent={"left"}
      alignItems={"center"}
    >
      <Box
        gap={"20px"}
        display={"flex"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        width={"100%"}
        justifyContent={"left"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          width={{ base: "100%", md: "45%", lg: "35%" }}
          padding={"15px"}
          backgroundColor={"white"}
          borderRadius={"5px"}
        >
          <Text
            mb={"20px"}
            fontSize={"20px"}
            fontWeight={"semibold"}
            color={"gray.700"}
          >
            Total User's
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text
              color={"hsl(352.86deg 100% 32.94%)"}
              fontSize={"30px"}
              fontWeight={"semibold"}
            >
              {datas === null ? "Loading" : datas[0]?.totalUsers}
            </Text>
            <Text cursor={"pointer"}>View All</Text>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          width={{ base: "100%", md: "45%", lg: "35%" }}
          padding={"15px"}
          backgroundColor={"hsl(352.86deg 100% 32.94%)"}
          borderRadius={"5px"}
        >
          <Text
            mb={"20px"}
            fontSize={"20px"}
            fontWeight={"semibold"}
            color={"white"}
          >
            Total Revenue
          </Text>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text color={"white"} fontSize={"30px"} fontWeight={"semibold"}>
              ${datas == null ? "0" : datas[1]?.totalRevenue ?? "null"}
            </Text>
            <Text color={"white"} cursor={"pointer"}>
              View All
            </Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <ReactApexChart
          width={"300px"}
          options={data.options}
          series={datas == null ? [0] : datas[2]?.rolePercentage.percentage}
          type="pie"
          height={350}
        />
      </Box>
    </Box>
  );
};

export default StateCard;
