import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // What is required at signup
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // hide the password by default
    },

    // Optional for signup
    role: {
      type: String,
      enum: ["customer", "admin", "vendor"],
      default: "customer",
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    addresses: [
      {
        label: String,
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // wishlist / cart references for a product (later)
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    defaultCurrency: {
      type: String,
      default: "NGN",
    },
    marketingOption: {
      type: Boolean,
      default: true,
    },
    notificationPrefs: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      push: {
        type: Boolean,
        default: false,
      },
    },
    locale: {
      type: String,
    },
    termsAccepted: {
      type: Date, // come back here
    },
  },
  { timestamps: true },
);

// Only enforce uniqueness when a phone number is actually stored.
userSchema.index(
  { phone: 1 },
  {
    unique: true,
    partialFilterExpression: {
      phone: { $type: "string" },
    },
  },
);

export default mongoose.model("User", userSchema);
