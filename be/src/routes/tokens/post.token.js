const express = require("express");
const { check, validationResult } = require("express-validator");
const PurchasedTokenService = require("../../services/PurchasedTokenService");

const router = express.Router();

router.post(
  "/generate-token",
  [
    check("meterNumber", "Meter Number is Required")
      .exists()
      .notEmpty()
      .isLength({ min: 6, max: 6 }),
    check("amount", "Amount is Required").exists().notEmpty().isNumeric(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { meterNumber, amount } = req.body;

    try {
      const { token, days } = PurchasedTokenService.generateToken(amount);

      const purchasedToken = await PurchasedTokenService.save({
        meter_number: meterNumber,
        token,
        token_value_days: days,
        amount,
      });

      return res.status(200).json({ purchasedToken });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
);

module.exports = router;
