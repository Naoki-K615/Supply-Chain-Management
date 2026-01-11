// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    address public owner;  // Contract owner

    constructor() {
        owner = msg.sender;  // Set deployer as owner
    }

    // Modifier to allow only the owner to execute certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Transfer ownership to another address (if needed)
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }

    // Enum to represent different supply chain stages
    enum Stage {
        Ordered,
        RawMaterialSupplied,
        Manufactured,
        Distributed,
        Retail,
        Sold
    }

    // Enum to represent shipment status
    enum ShipmentStatus {
        Pending,
        InTransit,
        Delivered
    }

    // Structure to store details of a medicine
    struct Medicine {
        uint256 id;
        string name;
        string description;
        address supplier;
        address manufacturer;
        address distributor;
        address retailer;
        Stage stage;
    }

    // Structure for supply chain participants
    struct Participant {
        address addr;
        string name;
        string location;
    }

    // Structure for shipment tracking
    struct Shipment {
        uint256 medicineId;
        address sender;
        address receiver;
        string trackingId;
        ShipmentStatus status;
    }

    // Structure for transaction tracking
    struct Transaction {
        uint256 medicineId;
        address participant;
        string action;
        uint256 timestamp;
    }

    // Mappings to store data
    mapping(uint256 => Medicine) public medicines;
    mapping(address => Participant) public suppliers;
    mapping(address => Participant) public manufacturers;
    mapping(address => Participant) public distributors;
    mapping(address => Participant) public retailers;
    mapping(string => Shipment) public shipments;
    Transaction[] public transactions;

    // Counters to assign unique IDs
    uint256 public medicineCounter;

    // Events
    event MedicineAdded(uint256 indexed medicineId, string name);
    event ParticipantAdded(address indexed participant, string role);
    event MedicineStageUpdated(uint256 indexed medicineId, Stage newStage);
    event ShipmentCreated(uint256 indexed medicineId, string trackingId);
    event ShipmentUpdated(string trackingId, ShipmentStatus status);
    event TransactionRecorded(uint256 indexed medicineId, string action, address participant);

    // Add new medicine (only owner)
    function addMedicine(string memory _name, string memory _description) public onlyOwner {
        medicineCounter++;
        medicines[medicineCounter] = Medicine(
            medicineCounter,
            _name,
            _description,
            address(0),  // No supplier assigned yet
            address(0),  // No manufacturer assigned yet
            address(0),  // No distributor assigned yet
            address(0),  // No retailer assigned yet
            Stage.Ordered
        );

        emit MedicineAdded(medicineCounter, _name);
    }

    // Register supply chain participants (only owner)
    function addSupplier(address _addr, string memory _name, string memory _location) public onlyOwner {
        suppliers[_addr] = Participant(_addr, _name, _location);
        emit ParticipantAdded(_addr, "Supplier");
    }

    function addManufacturer(address _addr, string memory _name, string memory _location) public onlyOwner {
        manufacturers[_addr] = Participant(_addr, _name, _location);
        emit ParticipantAdded(_addr, "Manufacturer");
    }

    function addDistributor(address _addr, string memory _name, string memory _location) public onlyOwner {
        distributors[_addr] = Participant(_addr, _name, _location);
        emit ParticipantAdded(_addr, "Distributor");
    }

    function addRetailer(address _addr, string memory _name, string memory _location) public onlyOwner {
        retailers[_addr] = Participant(_addr, _name, _location);
        emit ParticipantAdded(_addr, "Retailer");
    }

    // Supply raw materials (Only Supplier)
    function supplyRawMaterials(uint256 _medicineID) public {
        require(suppliers[msg.sender].addr != address(0), "Not a registered supplier");
        require(medicines[_medicineID].stage == Stage.Ordered, "Invalid stage");
        medicines[_medicineID].supplier = msg.sender;
        medicines[_medicineID].stage = Stage.RawMaterialSupplied;

        emit MedicineStageUpdated(_medicineID, Stage.RawMaterialSupplied);
        recordTransaction(_medicineID, "Raw Material Supplied", msg.sender);
    }

    // Manufacture medicine (Only Manufacturer)
    function manufactureMedicine(uint256 _medicineID) public {
        require(manufacturers[msg.sender].addr != address(0), "Not a registered manufacturer");
        require(medicines[_medicineID].stage == Stage.RawMaterialSupplied, "Invalid stage");
        medicines[_medicineID].manufacturer = msg.sender;
        medicines[_medicineID].stage = Stage.Manufactured;

        emit MedicineStageUpdated(_medicineID, Stage.Manufactured);
        recordTransaction(_medicineID, "Manufactured", msg.sender);
    }

    // Distribute medicine (Only Distributor)
    function distributeMedicine(uint256 _medicineID) public {
        require(distributors[msg.sender].addr != address(0), "Not a registered distributor");
        require(medicines[_medicineID].stage == Stage.Manufactured, "Invalid stage");
        medicines[_medicineID].distributor = msg.sender;
        medicines[_medicineID].stage = Stage.Distributed;

        emit MedicineStageUpdated(_medicineID, Stage.Distributed);
        recordTransaction(_medicineID, "Distributed", msg.sender);
    }

    // Retail medicine (Only Retailer)
    function retailMedicine(uint256 _medicineID) public {
        require(retailers[msg.sender].addr != address(0), "Not a registered retailer");
        require(medicines[_medicineID].stage == Stage.Distributed, "Invalid stage");
        medicines[_medicineID].retailer = msg.sender;
        medicines[_medicineID].stage = Stage.Retail;

        emit MedicineStageUpdated(_medicineID, Stage.Retail);
        recordTransaction(_medicineID, "Available for Sale", msg.sender);
    }

    // Mark medicine as sold (Only assigned retailer)
    function sellMedicine(uint256 _medicineID) public {
        require(medicines[_medicineID].retailer == msg.sender, "Not the assigned retailer");
        require(medicines[_medicineID].stage == Stage.Retail, "Invalid stage");
        medicines[_medicineID].stage = Stage.Sold;

        emit MedicineStageUpdated(_medicineID, Stage.Sold);
        recordTransaction(_medicineID, "Sold", msg.sender);
    }

    // Get current stage of medicine
    function getMedicineStage(uint256 _medicineID) public view returns (string memory) {
        require(_medicineID > 0 && _medicineID <= medicineCounter, "Invalid medicine ID");

        if (medicines[_medicineID].stage == Stage.Ordered) return "Ordered";
        if (medicines[_medicineID].stage == Stage.RawMaterialSupplied) return "Raw Material Supplied";
        if (medicines[_medicineID].stage == Stage.Manufactured) return "Manufactured";
        if (medicines[_medicineID].stage == Stage.Distributed) return "Distributed";
        if (medicines[_medicineID].stage == Stage.Retail) return "Retail";
        if (medicines[_medicineID].stage == Stage.Sold) return "Sold";

        return "Unknown";
    }

    // Create a shipment
    function createShipment(uint256 _medicineID, address _receiver, string memory _trackingId) public {
        require(medicines[_medicineID].distributor == msg.sender, "Only distributor can create shipment");
        shipments[_trackingId] = Shipment(_medicineID, msg.sender, _receiver, _trackingId, ShipmentStatus.Pending);

        emit ShipmentCreated(_medicineID, _trackingId);
    }

    // Update shipment status
    function updateShipmentStatus(string memory _trackingId, ShipmentStatus _status) public {
        require(shipments[_trackingId].sender != address(0), "Shipment not found");
        shipments[_trackingId].status = _status;

        emit ShipmentUpdated(_trackingId, _status);
    }

    // Get transaction history
    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    // Record transaction
    function recordTransaction(uint256 _medicineID, string memory _action, address _participant) internal {
        transactions.push(Transaction(_medicineID, _participant, _action, block.timestamp));
        emit TransactionRecorded(_medicineID, _action, _participant);
    }
}