import { db } from "@/db";

export const newOrganization = async (
  name,
  organizationname,
  country,
  address,
  email,
  contactno,
  adminusername
) => {
  let rows;
  const status = "pending";
  const transaction = db.transaction(() => {
    try {
      const query1 = `INSERT INTO organizations (name,
        organizationname,
        country,
        address,
        email,
        contactno,
        adminusername,status) VALUES (?,?,?,?,?,?,?,?);`;

      db.prepare(query1).run(
        name,
        organizationname,
        country,
        address,
        email,
        contactno,
        adminusername,
        status
      );
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const organizationValidation = async (
  organizationname,
  adminusername
) => {
  let organizationNameExist;
  let adminuserNameExist;
  const transaction = db.transaction(() => {
    try {
      const query1 = `SELECT * FROM organizations WHERE organizationname = ?;`;
      organizationNameExist = db.prepare(query1).all(organizationname);

      const query2 = `SELECT * FROM organizations WHERE adminusername = ?;`;
      adminuserNameExist = db.prepare(query2).all(adminusername);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return { organizationNameExist, adminuserNameExist };
};

export const getPendingOrganization = async () => {
  let rows;
  const transaction = db.transaction(() => {
    try {
      const query1 = `SELECT * FROM organizations WHERE status = 'pending';`;
      rows = db.prepare(query1).all();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};
