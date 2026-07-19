const Address = require('../models/address');

// @desc    Create a new address
// @route   POST /api/addresses
// @access  Public
exports.createAddress = async (req, res) => {
  try {
    const {
      user,
      fullName,
      phone,
      houseNo,
      street,
      landmark,
      city,
      state,
      pincode,
      addressType,
      isDefault,
    } = req.body;

    const address = await Address.create({
      user,
      fullName,
      phone,
      houseNo,
      street,
      landmark,
      city,
      state,
      pincode,
      addressType,
      isDefault: isDefault || false,
    });

    const populatedAddress = await Address.findById(address._id).populate(
      'user',
      'name'
    );

    res.status(201).json({
      success: true,
      message: 'Address created successfully',
      address: populatedAddress,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all addresses
// @route   GET /api/addresses
// @access  Public
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single address by ID
// @route   GET /api/addresses/:id
// @access  Public
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id).populate(
      'user',
      'name'
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get addresses by user ID
// @route   GET /api/addresses/user/:userId
// @access  Public
exports.getAddressesByUser = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.params.userId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update an address
// @route   PUT /api/addresses/:id
// @access  Public
exports.updateAddress = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      houseNo,
      street,
      landmark,
      city,
      state,
      pincode,
      addressType,
      isDefault,
    } = req.body;

    let address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    const updateData = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (phone !== undefined) updateData.phone = phone;
    if (houseNo !== undefined) updateData.houseNo = houseNo;
    if (street !== undefined) updateData.street = street;
    if (landmark !== undefined) updateData.landmark = landmark;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (pincode !== undefined) updateData.pincode = pincode;
    if (addressType !== undefined) updateData.addressType = addressType;
    if (isDefault !== undefined) updateData.isDefault = isDefault;

    address = await Address.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('user', 'name');

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      address,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete an address
// @route   DELETE /api/addresses/:id
// @access  Public
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    await address.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};