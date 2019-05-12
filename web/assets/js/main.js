//const ethcon="0x153cb5191a04899222381138358b1d9ffab43c62" // remix, rinkeby, Current version:0.5.1+commit.c8a2cb62.Emscripten.clang

const ethcon="0x61Dd7879220c5BaD67FB7B62E617799158E06B43" // local testnet

async function executeTransaction(){
    await ethereum.enable();
    var electionr = Number(document.querySelector("#name").value);
    console.log("Voting on " + electionr );
    
    window.web3.eth.contract(ABI).at(ethcon)
                .vote(electionr, { from: web3.eth.accounts[0] }, error => { if (error) alert(error);console.log(web3); }
                );
}

// https://metamask.github.io/metamask-docs/Best_Practices/Registering_Function_Names
// function vote(uint256)
// truffle(development)> web3.utils.sha3('vote(uint256)')
// '0x0121b93f72187576473c204d34b90cf00169122e2ec0531d05f4ee667cd67d7b'
// in Voting.json (truffle deploy) ook signature: 0x0121b93f
// https://etherscan.io/address/0x44691b39d1a75dc4e0a0346cbb15e310e6ed1e86#writeContract
//      https://etherscan.io/tx/0x64e9ff508547e0b04aa37d846d0d0f4fd66d6acd1f51e445fa563f73d5713f57
// https://jennypollack.github.io/function_signature_registry/     0x0121b93f ==>  vote(uint256)

function check(){
	window.web3.eth.contract(ABI).at(ethcon).elections(Number(document.querySelector("#name").value), {
                from: web3.eth.accounts[0]
            }, (res) => {
		
                console.log('res', res)
            });
}


//window.web3.eth.contract(ABI).at(ethcon).issuedTokens({
//        		        from: web3.eth.accounts[0]
//		            }, (res2) => {
//				alert(3 +"/"+ 13);
//        		        console.log('res2', res2)
//        	    });




function give(){
    amount=Number(document.querySelector("#voteadd").value);
    address=document.querySelector("#address").value;
    //console.log(address);   
    //alert("Giving "+amount+" voting tokens to address "+address);
    window.web3.eth.contract(ABI).at(ethcon).issueTokens(address,amount, 
            {  from: web3.eth.accounts[0] }, (res) => 
                { // console.log('res', res)
                }
            );
	return 1;
}




function createelection(){
    address=document.querySelector("#address").value;
    console.log(address);   
    window.web3.eth.contract(ABI).at(ethcon).createElection( 
            {  from: web3.eth.accounts[0] }, (res,nrofelections) => 
                {  console.log('res', res);
                   console.log('nrofelections=', nrofelections); // weird return value
                }
            );
	return 1;
}


function geteth() {
    fromaddress='0xa80e6c54b9b0ebe636894652beddd3401ed2e2db';
    address=document.querySelector("#address").value;
    console.log(address);  
    window.web3.eth.sendTransaction(
        {  from:fromaddress,
            to:address, 
            value:web3.toWei(1, "ether")
        },(res) => 
        { console.log(res);});
}      
      

      
function getaccountinfo()
{           

    document.querySelector("#address").value =  web3.eth.accounts[0];
    window.web3.eth.getBalance( web3.eth.accounts[0],  (res,balance) => 
    {
        //console.log(res);
        document.querySelector("#ethbalance").value = window.web3.fromWei(balance,'ether').toString()
    } );
           
    window.web3.eth.contract(ABI).at(ethcon).balanceOf( web3.eth.accounts[0],
            {  from: web3.eth.accounts[0] }, (res, balance)  => 
    {  
        //console.log("res="+res);
        document.querySelector("#votebalance").value = balance;
    } );
	return 1;
}

function getelectioninfo() {    
    
    //console.log("Check #elections");
    window.web3.eth.contract(ABI).at(ethcon).nrofelections( (error,result) => 
    { 
        //console.log("#elections: " + result);    
        document.querySelector("#election").value =  "Nr of elections=" + result; 
        var i;
        for (i = 0; i < result; i++) {           
            window.web3.eth.contract(ABI).at(ethcon).elections( i,(error,result) => 
                {   //console.log("Error: "+error);console.log("elections="+result.toString());  
                    document.querySelector("#election").value += "; v["+i+"]="+result.toString(); // volgorde niet gegarandeerd!
                } );
        }            
    }     
    );   
}

    document.querySelector("#contract").value=ethcon;
    document.querySelector("#etherlink").href +=ethcon;
    
var networkinfo;

    web3.version.getNetwork((err, netId) => {
        fetch("https://chainid.network/chains.json")
        .then(response => response.json())
        .then(json => 
                {   console.log("netId="+netId);
                    networkinfo= json[netId-1];    // doesn't allways work!
                    console.log(networkinfo); 
                }
              );
    } );
  console.log(web3.version);

 
  
async function updateinfo() {
await ethereum.enable().catch(err => { console.log("error");console.log(err); });
    var version = web3.version.api;
    console.log("Web3.js version = "+version); // "0.2.0" https://github.com/ethereum/wiki/wiki/JavaScript-API#web3-javascript-app-api-for-02xx
    getaccountinfo();
    getelectioninfo();
}


window.addEventListener('unhandledrejection', event => {
    // can prevent error output on the console:
    event.preventDefault();

    // send error to log server
    console.log(event);
    alert('Type: '+event.type+'\r\nReason: ' + event.reason.message+'\r\nCode: '+event.reason.code);
});

ethereum.on('accountsChanged',  (accounts) => console.log("accountsChanged") );
ethereum.on('networkChanged',  (network) => console.log("networkChanged") );
//window.onbeforeunload = function() {  return "Prevent reload" }


function seticon() {
    
    window.web3.currentProvider.sendAsync({
                method: 'metamask_watchAsset',
                params: {
                  "type":"ERC20",
                  "options":{
                    "address": ethcon,
                    "symbol": "dDAO",
                    "decimals": 0,
                    "image": window.location.origin+"/images/logo-small.png"   // locat paths are local in chome extension path
                  },
                },
                id: Math.round(Math.random() * 100000),
              }, (err) => console.log(err) );
}
              
              

                