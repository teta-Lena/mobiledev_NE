const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const tokenSchema = mongoose.Schema({
  id: {
    type: Number,
    // required: true,
    length: 11,
  },
  meter_number: {
    type: String,
    length: 8,
    required: true,
  },
  token: {
    type: String,
    length: 8,
    // required: true,
  },
  token_status: {
    type: String,
    enum: ["USED", "NEW", "EXPIRED"],
    required: true,
    default: "NEW",
  },
  token_value_days: {
    type: Number,
    length: 11,
    required: true,
  },
  purchased_date: {
    type: Date.now().toString(),
  },
  amount: {
    type: Number,
    length: 11,
  },
});

const Purchased_Tokens = mongoose.model("purchased_tokens", tokenSchema);

module.exports = Purchased_Tokens;


