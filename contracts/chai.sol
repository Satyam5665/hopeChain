//SPDX-License-Identifier:MIT

pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract chai {
    struct memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }

    memo[] memos;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buychai(string memory _name, string memory _mssg) public payable {
        require(msg.value > 0, "Send Money Greater than 0");
        owner.transfer(msg.value);
        memos.push(memo(_name, _mssg, block.timestamp, msg.sender));
    }

    function getmemos() public view returns (memo[] memory) {
        return memos;
    }
}
