/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "./token/ERC721/ERC721.sol";
//import "./access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LipToken is ERC721, Ownable {
    // Constructor de mi Smart Contract
    constructor(string memory _name, string memory _symbol) 
           ERC721(_name, _symbol) {        
    }

    // =====================================================
    // Declaraciones iniciales

    // Contador de tokens NFT
    uint256 counter;
    // fijación en el precio de los tokens NFT
    uint256 fee = 1 ether;
    uint256 feeLevel = 0.05 ether;
    // Estructura de datos con las propiedades del lip (labio)
    struct Lip {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        // uint8 price;  // para futuros automatizaciones de precios
        uint8 rarity;
    }

    // Estructura de almacenamiento
    Lip[] public lips;
    // Declaracion de un evento
    event NewLip(address indexed owner, uint256 id, uint256 dna);

    // ===============================================================
    // funciones de ayuda

    // Asignación de un número aleatorio
    function _createRandomNum(uint256 _mod) internal view returns (uint256) {
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;
    }

    // Actualización del precio del Token NFT
    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    // Extracción de los ethers del Smart Contract hacia el Owner
    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // Creación del Token NFT (lip/labio)
    function _createLip(string memory _name) internal {
       uint8 randRarity = uint8(_createRandomNum(100));
       uint randDna = _createRandomNum(10**16);
       Lip memory newLip = Lip(_name, counter, randDna, 1, randRarity);
       lips.push(newLip);
       _safeMint(msg.sender, counter);
       emit NewLip(msg.sender, counter, randDna);
       counter++;
    }

    //==================================================================
    // Creación de un labio aleatorio
    function createRandomLip(string memory _name) public payable {
        require(msg.value >= fee, "No tiene suficientes fondos");
        _createLip(_name);
    }

    // Obtención de todos los labios creados
    function getLips() public view returns (Lip[] memory) {
        return lips;
    }

    // Visualizar el balance del smart contract
    function moneySmartContract() public view returns (uint256) {
        return address(this).balance;
    }

    // Visualizar la dirección del Smart Contract
    function addressSmartContract() public view returns (address) {
        return address(this);
    }

    // Obtención de los tokens NFT usuario
    function getOwnerLips(address _owner) public view returns (Lip[] memory) {
        Lip [] memory result = new Lip[] (balanceOf(_owner));
        uint256 _counter = 0;
        for (uint256 i = 0; i < lips.length; i++) {
            if (ownerOf(i) == _owner) {
                result[_counter] = lips[i];
                _counter++;
            }
        }
        return result;
    }

    function levelUp(uint256 _lipId) public payable {        
        require(ownerOf(_lipId) == msg.sender, "Usted no es el duenio de este NFT") ;
        require(msg.value >= feeLevel, "No tiene suficientes fondos para subir de nivel");
        Lip storage lip = lips[_lipId];
        lip.level++;        
    }


}