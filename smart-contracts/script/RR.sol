//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
import "../src/StableCoin.sol";
contract Deploy{
    // broadcast()
    function run()  public {
        StableCoin Coin = new StableCoin();
        vm.startBroadCast();
    
        vm.stopBroadCast();
      
        
    }
}