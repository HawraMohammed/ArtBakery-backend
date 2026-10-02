const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin')
            return res.status(403).json("You are not authorized to manage this resource")

        next();
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
module.exports = { isAdmin }