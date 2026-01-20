// Simulating a 3rd-party Inventory API

exports.getPartDetails = async (partId) => {
  // Normally this would be axios.get("inventory-api/parts/" + partId)

  const inventory = {
    BP01: { partName: "Brake Pad", price: 1200, stock: 20 },
    OC01: { partName: "Oil Can", price: 500, stock: 50 }
  };

  if (!inventory[partId]) {
    throw new Error("Part not found in inventory");
  }

  return inventory[partId];
};
