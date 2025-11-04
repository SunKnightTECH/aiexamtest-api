export type configType = {
    apiBaseUrl: string;
    env_version: string;
    enableSwagger: boolean;
    domain: string;
    port: number;
    //redis配置
    redisconfig: {
        host: string;
        port: number;
        password: string;
        db: number; // 目标库
    };
    //jwt配置
    jwtconfig: {
        //生成token的key
        secret: string;
        // signOption可以在JwtModule设定
        // 或是在createToken时候设定
        signOptions: {
            //token的有效时长,单位毫秒(https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d"
            expiresIn: string;
        };
    };
    mongoDBConfig: {
        uri: string;
        retryAttempts: number;
        retryDelay: number; //重试间隔
        maxPoolSize: number;
        maxConnecting: number;
    },
    openaiConfig: {
        apiKey: string;
        baseURL: string;
        model: string;
    }
};
