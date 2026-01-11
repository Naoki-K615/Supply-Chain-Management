const Shipment = require("../models/Shipment");

exports.createShipment = async (req, res) => {
  try {
    const { medicineId, sender, receiver, trackingId } = req.body;

    if (!medicineId || !sender || !receiver || !trackingId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const shipment = new Shipment({
      medicineId,
      sender,
      receiver,
      trackingId,
      status: "Pending",
    });

    await shipment.save();

    res.status(201).json({ message: "Shipment created", shipment });

  } catch (error) {
    console.error("Error creating shipment:", error);
    res.status(500).json({ error: "Error creating shipment" });
  }
};

exports.updateShipmentStatus = async (req, res) => {
  try {
      const { trackingId, status } = req.body;
      const shipment = await Shipment.findOne({ trackingId });
      if (!shipment) {
          return res.status(404).json({ message: 'Shipment not found' });
      }
      shipment.status = status;
      await shipment.save();
      res.status(200).json({ message: 'Shipment status updated successfully', shipment });
  } catch (error) {
      res.status(500).json({ message: 'Error updating shipment status', error });
  }
};

exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};