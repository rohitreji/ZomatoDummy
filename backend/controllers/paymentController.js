const Payment = require('../models/payment');

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Public
exports.createPayment = async (req, res) => {
  try {
    const { order, user, amount, paymentMethod, paymentStatus, transactionId } = req.body;

    const payment = await Payment.create({
      order,
      user,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
    });

    const populatedPayment = await Payment.findById(payment._id)
      .populate('order')
      .populate('user', 'name');

    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      payment: populatedPayment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all payments
// @route   GET /api/payments
// @access  Public
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('order')
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single payment by ID
// @route   GET /api/payments/:id
// @access  Public
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('order')
      .populate('user', 'name');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get payments by user ID
// @route   GET /api/payments/user/:userId
// @access  Public
exports.getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.userId })
      .populate('order')
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a payment
// @route   PUT /api/payments/:id
// @access  Public
exports.updatePayment = async (req, res) => {
  try {
    const { amount, paymentMethod, paymentStatus, transactionId } = req.body;

    let payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    const updateData = {};
    if (amount !== undefined) updateData.amount = amount;
    if (paymentMethod) updateData.paymentMethod = paymentMethod;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (transactionId !== undefined) updateData.transactionId = transactionId;

    payment = await Payment.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('order')
      .populate('user', 'name');

    res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a payment
// @route   DELETE /api/payments/:id
// @access  Public
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    await payment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Payment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};