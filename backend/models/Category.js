const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        icon: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

categorySchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name.toLowerCase().replace(/ /g, "-");
    }
    next();
});

module.exports = mongoose.model("Category", categorySchema);
