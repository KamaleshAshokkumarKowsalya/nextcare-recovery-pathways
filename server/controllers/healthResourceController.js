import HealthResource from '../models/HealthResource.js';

// @desc    Get all health resources
// @route   GET /api/health-resources
// @access  Public
export const getHealthResources = async (req, res) => {
  try {
    const { category, tags, featured } = req.query;
    const query = {};

    if (category) query.category = category;
    if (tags) query.tags = { $in: tags.split(',') };
    if (featured) query.featured = featured === 'true';

    const resources = await HealthResource.find(query)
      .sort({ createdAt: -1 });
    
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single health resource
// @route   GET /api/health-resources/:id
// @access  Public
export const getHealthResource = async (req, res) => {
  try {
    const resource = await HealthResource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Increment views
    resource.views += 1;
    await resource.save();

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new health resource (Admin only)
// @route   POST /api/health-resources
// @access  Private/Admin
export const createHealthResource = async (req, res) => {
  try {
    const resource = await HealthResource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update health resource (Admin only)
// @route   PUT /api/health-resources/:id
// @access  Private/Admin
export const updateHealthResource = async (req, res) => {
  try {
    const resource = await HealthResource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete health resource (Admin only)
// @route   DELETE /api/health-resources/:id
// @access  Private/Admin
export const deleteHealthResource = async (req, res) => {
  try {
    const resource = await HealthResource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.deleteOne();
    res.json({ message: 'Resource removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
