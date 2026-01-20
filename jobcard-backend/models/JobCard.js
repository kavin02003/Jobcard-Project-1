const mongoose = require("mongoose");

const jobCardSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    enum: ["2W", "4W"]
  },
  vehicleNumber: String,

  customerName: String,
  customerPhone: String,

  status: {
    type: String,
    enum: [
      "CREATED",
      "IN_PROGRESS",
      "ISSUE_REPORTED",
      "DONE",
      "BILLED",
      "DELIVERED"
    ],
    default: "CREATED"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  servicesRequested: [String],

  technicianUpdates: [
    {
      note: String,
      isCritical: Boolean,
      createdAt: { type: Date, default: Date.now }
    }
  ],

  completionSummary:{
    workDone: String,
    nextServiceAdvice: String,
    preventionTips: String
  },

  sparePartsUsed: [
    {
      partId: String,
      partName: String,
      quantity: Number,
      price: Number
    }
  ],

  bill: {
    totalAmount: Number,
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    generatedAt: Date
  }

}, { timestamps: true });

module.exports = mongoose.model("JobCard", jobCardSchema);
