pragma solidity ^0.4.17;

contract Voting{
    address public electionAuthority;
    bool public electionStarted;
    string[] public candidates; // Registered candidates
    mapping (string => uint) votes; // Candidate ID to number of votes

    function Voting() public{
        electionAuthority = msg.sender;
        electionStarted = false;
    }

    modifier only_election_authority() {
        if (msg.sender != electionAuthority) revert();
        _;
    }
    
    modifier onlyWhenElection() {
        if(electionStarted == false) revert();
        _;
    }
    
    modifier onlyWhenElectionDone() {
        if(electionStarted == true) revert();
        _;
    }
    
    function reset() public
        only_election_authority onlyWhenElectionDone
        {
            for(uint i = 0; i<candidates.length;i++){
                string candidateName = candidates[i];
                votes[candidateName] = 0;
            }
            candidates = new string[](0);
        }
    
    function startElection() public
        only_election_authority
        {
            electionStarted = true;
        }
        
    function stopElection() public
        only_election_authority
        {
            electionStarted = false;
        }

    function register_candidate(string memory id) public
        only_election_authority
    {
        candidates.push(id);
    }

    function vote(string memory candidateName) public
        only_election_authority onlyWhenElection
    {
        votes[candidateName] += 1;
    }

    function get_num_candidates() public view returns(uint) {

        return candidates.length;
    }

    function get_candidate(uint i) public
        view returns(string memory _candidate, uint _votes)
    {
        _candidate = candidates[i];
        _votes = votes[_candidate];
    }
}