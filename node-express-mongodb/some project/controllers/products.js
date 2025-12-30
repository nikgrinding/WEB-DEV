const getProductsStatic = async (req, res) => {
    return res.status(200).json({ message: "products testing route" });
};

const getProducts = async (req, res) => {
    return res.status(200).json({ message: "products route" });
};

module.exports = { getProducts, getProductsStatic };
