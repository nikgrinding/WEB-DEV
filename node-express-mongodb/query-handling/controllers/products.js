const Product = require("../models/products");

const getProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort("-name");
    return res.status(200).json({ nbHits: products.length, products });
};

const getProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true";
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    if (numericFilters) {
        const operatorsMap = { ">": "$gt", ">=": "$gte", "<": "$lt", "<=": "$lte", "=": "$eq" };
        let filters = numericFilters.replace(/\b(<|>|>=|=|<|<=)\b/g, (match) => `-${operatorsMap[match]}-`);
        const options = ["price", "rating"];
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                queryObject[field] = { ...queryObject[field], [operator]: Number(value) };
            }
        });
    }

    let result = Product.find(queryObject);

    if (sort) {
        result = result.sort(sort.split(",").join(" "));
    } else {
        result = result.sort("createdAt");
    }

    if (fields) {
        result = result.select(fields.split(",").join(" "));
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const products = await result.skip(skip).limit(limit);

    return res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getProducts, getProductsStatic };
