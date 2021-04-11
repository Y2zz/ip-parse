const http = require("axios");

const ipParse = () => {
  return new Promise((resolve, reject) => {
    http
      .get("http://myip.ipip.net/")
      .then((response) => {
        // 当前 IP：0.0.0.0  来自于：中国 湖南 长沙  电信
        if (response.data.length === 0) {
          reject(null);
          return;
        }

        let result = response.data.split("  ");

        const ip = result[0].split("：")[1];
        const c2 = result[1].split("：")[1].split(" ");
        const isp = result[2];

        result = {
          ip: ip,
          country: c2[0],
          region: c2[1],
          city: c2[2],
          district: c2[3],
          isp: isp,
        };

        for (let item in result) {
          if (result[item]) {
            result[item] = result[item].trim();
          }
        }

        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default ipParse;
