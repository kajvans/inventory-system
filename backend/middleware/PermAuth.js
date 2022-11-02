function HasPerm(perm) {
    return HasPerm[perm] || (HasPerm[perm] = function (req, res, next) {
        var userperm = req.Perms.toString(2);
        if(userperm.length - perm < 0){
            res.status(401).json({ msg: "You don't have permission to do this" });
        }
        else if (1 != userperm.charAt(userperm.length - perm)) {
            return res.status(403).json({ msg: "You are not authorized to access this page" });
        }
        else {
            next();
        }
    });
}

module.exports = HasPerm;