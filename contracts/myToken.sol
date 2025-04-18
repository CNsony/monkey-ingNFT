pragma solidity ^0.8.0;

contract Token {
    string public name = 'My Token';
    string public symbol = 'MT';

    uint256 public totalSupply = 1000000;

    address public owner;

    mapping(address=>uint256) balances;

    event Transfer(address indexed _form, address _to, uint256 _value);

    constructor(){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }


    function transfer(address to, uint256 amount) external{
        require(balances[msg.sender]>=amount,'not enough token');

        balances[msg.sender] -= amount;
        balances[to]+=amount;

        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256){
        return balances[account];
    }
}