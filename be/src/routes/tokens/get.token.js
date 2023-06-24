const express = require("express");
const { check, validationResult } = require("express-validator");
const PurchasedTokenService = require("../../services/PurchasedTokenService");

const router = express.Router();

router.get(
  "/",
  [
    check("meterNumber", "Meter Number is required")
      .exists()
      .notEmpty()
      .isLength({ min: 6, max: 6 }),
  ],
  async (req, res, next) => {
    const { meterNumber } = req.query;
    console.log(meterNumber);

    try {
      const purchasedTokens =
        await PurchasedTokenService.getTokensByMeterNumber(meterNumber);
      return res.status(200).json({ purchasedTokens });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
