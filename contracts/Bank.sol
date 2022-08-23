// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

error Bank__TransferFail();

contract Bank {
    mapping(address => uint256) public balances;

    event WithdrawSuccess(address indexed _withdrawer, uint256 _amount);

    function deposit() external payable {
        balances[msg.sender] = msg.value;
    }

    function withdraw(uint256 _amount) external {
        require(_amount > 0, "Amount to withdraw should be greater than 0");
        require(balances[msg.sender] >= _amount, "Not enough balance");

        (bool success, ) = payable(msg.sender).call{value: _amount}("");

        if (!success) {
            revert Bank__TransferFail();
        }
        balances[msg.sender] -= _amount;
        emit WithdrawSuccess(msg.sender, _amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
