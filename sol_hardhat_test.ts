一段关于使用Hardhat进行开发和编写测试用例的内容。

### 学习计划：Solidity编程

#### 第3阶段：实际项目实践

##### 7. 项目开发

**目标**：通过实际项目巩固所学知识。

**学习内容和任务**：

**1. 使用Hardhat进行开发**

**目标**：使用Hardhat搭建Solidity开发环境，并编写测试用例。

**学习内容和任务**：

**1.1 安装和设置Hardhat**
- **教学内容**：
  - 安装Hardhat和必要的依赖
  - 初始化Hardhat项目
- **学习任务**：
  1. **安装Hardhat**：
     ```bash
     npm install --save-dev hardhat
     ```
  2. **初始化Hardhat项目**：
     ```bash
     npx hardhat
     ```
     选择 "Create a basic sample project" 并按照提示完成初始化。

**1.2 编写智能合约**
- **教学内容**：
  - 编写Solidity智能合约
  - 在Hardhat项目中管理合约
- **学习任务**：
  1. **编写智能合约**：
     在 `contracts/` 目录下创建一个新的 Solidity 文件（如 `MyToken.sol`），并编写合约代码。
     ```solidity
     // SPDX-License-Identifier: MIT
     pragma solidity ^0.8.0;

     import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

     contract MyToken is ERC20 {
         constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
             _mint(msg.sender, initialSupply);
         }
     }
     ```

**1.3 编译和部署智能合约**
- **教学内容**：
  - 使用Hardhat编译和部署智能合约
- **学习任务**：
  1. **编译合约**：
     ```bash
     npx hardhat compile
     ```
  2. **部署合约**：
     在 `scripts/` 目录下创建一个部署脚本（如 `deploy.js`）。
     ```javascript
     async function main() {
         const [deployer] = await ethers.getSigners();

         console.log("Deploying contracts with the account:", deployer.address);

         const MyToken = await ethers.getContractFactory("MyToken");
         const token = await MyToken.deploy(1000);

         console.log("Token deployed to:", token.address);
     }

     main().then(() => process.exit(0)).catch((error) => {
         console.error(error);
         process.exit(1);
     });
     ```
     运行部署脚本：
     ```bash
     npx hardhat run scripts/deploy.js --network localhost
     ```

**1.4 编写测试用例**
- **教学内容**：
  - 使用Hardhat编写和运行测试用例
- **学习任务**：
  1. **编写测试用例**：
     在 `test/` 目录下创建测试文件（如 `MyToken.js`）。
     ```javascript
     const { expect } = require("chai");

     describe("MyToken", function () {
         it("Should deploy with initial supply", async function () {
             const [owner] = await ethers.getSigners();
             const MyToken = await ethers.getContractFactory("MyToken");
             const token = await MyToken.deploy(1000);

             const ownerBalance = await token.balanceOf(owner.address);
             expect(await token.totalSupply()).to.equal(1000);
             expect(ownerBalance).to.equal(1000);
         });

         it("Should transfer tokens between accounts", async function () {
             const [owner, addr1, addr2] = await ethers.getSigners();
             const MyToken = await ethers.getContractFactory("MyToken");
             const token = await MyToken.deploy(1000);

             await token.transfer(addr1.address, 100);
             expect(await token.balanceOf(addr1.address)).to.equal(100);

             await token.connect(addr1).transfer(addr2.address, 50);
             expect(await token.balanceOf(addr2.address)).to.equal(50);
         });
     });
     ```
  2. **运行测试用例**：
     ```bash
     npx hardhat test
     ```

### 教学方法
- **讲解和示范**：通过在线教程或教材进行概念讲解，并进行代码示范。
- **动手实践**：学生需要动手完成每个学习任务，通过编写和运行代码巩固所学知识。
- **讨论和反馈**：学生完成任务后，可以讨论遇到的问题并获得反馈，进一步理解和改进。
 
