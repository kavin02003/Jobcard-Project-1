const JobCard = require("../models/JobCard");
const User = require("../models/User");
const { getPartDetails } = require("../services/inventory.service");

/* ADVISOR */
exports.createJobCard = async (req, res) => {
  try {
    const job = await JobCard.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* MANAGER */
exports.assignTechnician = async (req, res) => {
  try {
    const job = await JobCard.findByIdAndUpdate(
      req.params.id,
      { assignedTechnician: req.body.technicianId },
      { new: true }
    );
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role;
    }

    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.filterTechnician = async (req, res) => {
  const { role } = req.query;

  const users = role
    ? await User.find({ role })
    : await User.find();

  res.json(users);
};

exports.getUsers = async (req,res) => {
  try{
    const filter = {};
      if(req.query.role){
        filter.role = req.query.role
      }  
      const users = await User.find(filter)
      res.json(users);
  }catch(err){
      res.json({error:err.message})
  }
}

/* User Approved Route */
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* User Rejected Route */
exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { approved: false },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const job = await JobCard.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* TECHNICIAN */
exports.getJobs = async (req, res) => {
  try{
     const jobs = await JobCard.find({
    assignedTechnician: req.user.id
  });
  res.json(jobs);
  }catch (err){
    res.status(500).json({ error: err.message });
  }
};




exports.updateProgress = async (req, res) => {
  try {
    const job = await JobCard.findById(req.params.id);
    job.status = "IN_PROGRESS";
    job.technicianUpdates.push({
      note: req.body.note,
      isCritical: false
    });
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reportIssue = async (req, res) => {
  try {
    const job = await JobCard.findById(req.params.id);
    job.status = "ISSUE_REPORTED";
    job.technicianUpdates.push({
      note: req.body.note,
      isCritical: true
    });
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeJob = async (req, res) => {
  try {
    const job = await JobCard.findByIdAndUpdate(
      req.params.id,
      {
        status: "DONE",
        completionSummary: req.body
      },
      { new: true }
    );
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CASHIER */
exports.generateBill = async (req, res) => {
  try {
    const job = await JobCard.findById(req.params.id);

    if (job.status !== "DONE") {
      return res.status(400).json({ message: "Job not completed yet" });
    }

    let totalAmount = 0;
    const validatedParts = [];

    for (let item of req.body.spareParts) {
      const part = await getPartDetails(item.partId);

      if (item.quantity > part.stock) {
        return res.status(400).json({
          message: `Insufficient stock for ${part.partName}`
        });
      }

      const cost = part.price * item.quantity;
      totalAmount += cost;

      validatedParts.push({
        partId: item.partId,
        partName: part.partName,
        quantity: item.quantity,
        price: part.price
      });
    }

    job.sparePartsUsed = validatedParts;
    job.bill = {
      totalAmount,
      generatedBy: req.user.id,
      generatedAt: new Date()
    };
    job.status = "BILLED";

    await job.save();

    res.json({
      message: "Bill generated successfully",
      bill: job.bill,
      sparePartsUsed: validatedParts
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* COMMON */
exports.getJobCards = async (req, res) => {
  try {
    const jobs = await JobCard.find()
      .populate("createdBy assignedTechnician");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.kanbanView = async (req, res) => {
  try {
    const data = {};
    const statuses = [
      "CREATED",
      "IN_PROGRESS",
      "ISSUE_REPORTED",
      "DONE",
      "BILLED",
      "DELIVERED"
    ];

    for (let status of statuses) {
      data[status] = await JobCard.find({ status })
        .populate("assignedTechnician", "name");

    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
