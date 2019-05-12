pragma solidity ^0.5.0;

contract Voting{
	uint[] public elections ;
	mapping(address=>uint) public balances ;
	uint issuedTokens ;
	address owner;
	
	event newVote(uint curr, uint total);

	function balanceOf(address _owner) public view returns (uint256) {
		return balances[_owner];
	}

	constructor() public{
		owner=msg.sender;
	}
	
	function createElection() public returns (uint) {
		elections.push(0);
		return elections.length-1;
	}

	function vote(uint id) public {
		require(id<elections.length);
		uint votes=balances[msg.sender];
		require(votes>0);
		balances[msg.sender]=0;
		elections[id]+=votes;
		emit newVote(elections[id], issuedTokens);
	}

	function issueTokens(address receiver, uint num) public{
	//	require(owner==msg.sender);
		balances[receiver]+=num;
		issuedTokens+=num;
	}

	function nrofelections() public view returns (uint) {
		return elections.length;
	}


}
