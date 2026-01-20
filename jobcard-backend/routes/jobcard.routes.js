const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  createJobCard,
  assignTechnician,
  updateStatus,
  filterTechnician,
  getJobs,
  updateProgress,
  reportIssue,
  completeJob,
  getJobCards,
  generateBill,
  kanbanView,
  getUsers,
  approveUser,
  rejectUser
} = require("../controllers/jobcard.controller");

router.post("/", auth, role("ADVISOR"), createJobCard);

router.get("/users", auth, role("MANAGER"), filterTechnician)
router.get("/user",auth, role("MANAGER"), getUsers)
router.put("/:id/assign", auth, role("MANAGER"), assignTechnician);
router.get("/kanban", auth, role("MANAGER"), kanbanView);
router.put("/:id/status", auth, role("MANAGER"), updateStatus);
router.put("/user/:id/approve", auth, role("MANAGER"), approveUser);
router.put("/user/:id/reject", auth, role("MANAGER"), rejectUser);

router.get("/my", auth, role("TECHNICIAN"), getJobs);
router.put("/:id/progress", auth, role("TECHNICIAN"), updateProgress);
router.put("/:id/issue", auth, role("TECHNICIAN"), reportIssue);
router.put("/:id/complete", auth, role("TECHNICIAN"), completeJob);

router.get("/", auth, getJobCards);


router.post("/:id/bill", auth, role("CASHIER"), generateBill);

module.exports = router;
