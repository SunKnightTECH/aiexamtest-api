import { configType } from "./configType";

const config: configType = {
    apiBaseUrl: "",
    env_version: "develop",
    enableSwagger: true,
    domain: "http://localhost:10221",
    port: 10221,
    //redis配置
    redisconfig: {
        host: "",
        port: 1,
        password: "",
        db: 3, // 目标库
    },
    //jwt配置
    jwtconfig: {
        //生成token的key
        secret: "secretapidev",
        // signOption可以在JwtModule设定
        // 或是在createToken时候设定
        signOptions: {
            //token的有效时长,单位毫秒(https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d"
            expiresIn: "1d",
        },
    },
    mongoDBConfig: {
        uri: ``,
        retryAttempts: 5, //重试次数
        retryDelay: 1500, //重试间隔
        maxPoolSize: 500,
        maxConnecting: 500,
    },
    openaiConfig: {
        apiKey: "",
        baseURL: "",
        model: "",
    }
};
export default config;
