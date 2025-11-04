import config_prod from "./config_prod";
import config_test from "./config_test";
import config_dev_service from "./config_dev_service";
import config_dev_local from "./config_dev_local";

const configs = {
    dev: config_dev_local,
    devService: config_dev_service,
    prod: config_prod,
    test: config_test,
};
const env = process.env.BUILD_ENV ? process.env.BUILD_ENV : "prod";
export default () => configs[env];
