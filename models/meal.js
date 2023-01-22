const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    name: {
        type: String,
        required: true,
    },
    servingSize: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    calories: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: false,
    },
    carbs: {
        type: Number,
        required: false,
    },
    fat: {
        type: Number,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

// MealSchema.index({ name: 'text', description: 'text' });


module.exports = mongoose.model('Song', MealSchema);
 