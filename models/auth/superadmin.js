const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const SuperadminSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(),
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    roles: {
      type: String,
      required: true,
      enum: ["SuperAdmin"],
      default: "SuperAdmin",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperAdmin", SuperadminSchema);
