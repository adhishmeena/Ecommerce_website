import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      // I also want to know the product associated with each user.
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    ShippingAddress: {
      address: { type: String, required: true },
      City: { type: String, required: true },
      PostalCode: { type: String, required: true },
      Country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      Update_time: { type: String },
      email_address: { type: String },
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    ShippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: 0.0,
    },

    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    DeliveredAt: {
      type: Date,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // when user register by default , he is not an admin , An admin need to make him admin (manually)
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
