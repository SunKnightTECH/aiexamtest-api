# AI Exam Test API

AI Exam Test 是一个基于 NestJS 的后端 API 服务，用于提供智能试卷评价功能。

## 功能特性

- 用户认证与授权
- 考试题目管理
- 智能评分系统
- 数据统计与分析
- 基于 Redis 的缓存机制
- MongoDB 数据存储
- OpenAI 集成

## 环境配置

项目支持多种环境配置：

- `dev`: 开发环境
- `devService`: 开发服务环境
- `test`: 测试环境
- `prod`: 生产环境

### 配置文件说明

在 `src/common/config/` 目录下有针对不同环境的配置文件：

- `config_dev_local.ts`: 本地开发环境配置
- `config_dev_service.ts`: 开发服务环境配置
- `config_test.ts`: 测试环境配置
- `config_prod.ts`: 生产环境配置

### 配置项说明

每个配置文件都包含以下主要配置项：

- `domain`: 服务域名
- `port`: 服务端口
- `redisconfig`: Redis 连接配置
- `jwtconfig`: JWT 认证配置
- `mongoDBConfig`: MongoDB 连接配置
- `openaiConfig`: OpenAI API 配置

要切换环境，请设置 `BUILD_ENV` 环境变量。

## 部署指南

### 环境要求

- Node.js >= 16.x
- pnpm >= 8.x
- MongoDB >= 5.x
- Redis >= 6.x

### 安装依赖

```bash
pnpm install
```

### 开发环境运行

```bash
# 本地开发模式
pnpm run dev

# 开发服务模式
pnpm run devService
```

### 生产环境构建与运行

```bash
# 构建项目
pnpm run build

# 运行生产环境
pnpm run prod

# 或者直接运行构建后的代码
pnpm run start:prod
```

### 测试

```bash
# 运行所有测试
pnpm run test

# 运行端到端测试
pnpm run test:e2e

# 运行测试并生成覆盖率报告
pnpm run test:cov
```

### 其他命令

```bash
# 格式化代码
pnpm run format

# 代码检查与修复
pnpm run lint
```

## 项目结构

```
src/
├── common/          # 公共模块
│   ├── auth/        # 认证相关
│   ├── config/      # 配置文件
│   ├── filter/      # 过滤器
│   ├── interceptor/ # 拦截器
│   ├── rediscache/  # Redis 缓存
│   └── utils/       # 工具函数
├── controller/      # 控制器
├── schema/          # 数据模型
└── main.ts          # 应用入口
```

## 环境变量

在部署时，请确保设置了正确的环境变量：

- `BUILD_ENV`: 构建环境 (dev/devService/test/prod)
- `PORT`: 服务端口 (可选，默认为配置文件中的端口)

## 许可证

本项目未指定许可证。