const AccessControl = require("accesscontrol");

const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};

let grantObject = {
  admin: {
    profile: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:own": ["*"],
    },
    brand: allRights,
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!_id"],
      "update:own": ["*", "!password", "!_id"],
    },
    brand: {
      "read:any": ["*"],
    },
  },
};

const roles = new AccessControl(grantObject);

module.exports = { roles };
