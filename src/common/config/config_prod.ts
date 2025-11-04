import { configType } from "./configType";

const config: configType = {
    apiBaseUrl: "",
    env_version: "release",
    enableSwagger: false,
    domain: "http://localhost:10221",
    port: 10223,
    //redis配置
    redisconfig: {
        host: "127.0.0.1",
        port: 10001,
        password: "ezxgcD16O@QyaGB*",
        db: 0, // 目标库
    },
    //jwt配置
    jwtconfig: {
        //生成token的key
        secret: "secretapipprod",
        // signOption可以在JwtModule设定
        // 或是在createToken时候设定
        signOptions: {
            //token的有效时长,单位毫秒(https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d"
            expiresIn: "1d",
        },
    },
    mongoDBConfig: {
        uri: `mongodb://admin:AUxh4JF2Pa0IET3@127.0.0.1:10002/aiexamtest?authSource=admin`,
        retryAttempts: 5, //重试次数
        retryDelay: 1500, //重试间隔
        maxPoolSize: 500,
        maxConnecting: 500,
    },
    openaiConfig: {
        apiKey: "sk-f4a26586fbfe48f488e7aa666867b24e",
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
        model: "qwen3-max",
    }
};
export default config;
