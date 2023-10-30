import { createDbPath, db } from "@/db";

export const newOrganization = async (
  name,
  organizationname,
  country,
  address,
  companyemail,
  contactno,
  adminemail
) => {
  let rows;
  const status = "pending";
  const transaction = db.transaction(() => {
    try {
      const query1 = `INSERT INTO organizations (name,
        organizationname,
        country,
        address,
        companyemail,
        contactno,
        adminemail,status) VALUES (?,?,?,?,?,?,?,?);`;

      db.prepare(query1).run(
        name,
        organizationname,
        country,
        address,
        companyemail,
        contactno,
        adminemail,
        status
      );
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const organizationValidation = async (organizationname, adminemail) => {
  let organizationNameExist;
  let adminuserNameExist;
  const transaction = db.transaction(() => {
    try {
      const query1 = `SELECT * FROM organizations WHERE organizationname = ?;`;
      organizationNameExist = db.prepare(query1).all(organizationname);

      const query2 = `SELECT * FROM organizations WHERE adminemail = ?;`;
      adminuserNameExist = db.prepare(query2).all(adminemail);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return { organizationNameExist, adminuserNameExist };
};

export const dbnameValidation = async (dbname) => {
  let row;
  const transaction = db.transaction(() => {
    try {
      const query1 = `SELECT * FROM organizations WHERE dbname = ?;`;
      row = db.prepare(query1).all(dbname);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return row;
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

export const updateOrgainzationStatus = async (organizationid, dbname) => {
  let rows;
  const transaction = db.transaction(() => {
    try {
      const query = `UPDATE organizations
      SET 
      status = 'Active',
      dbname = '${dbname}'
      WHERE organizationid = ${organizationid};`;
      db.prepare(query).run();
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};

export const newCompanyStaff = async (
  staffname,
  contracttype,
  contactno,
  nic,
  hashedPassword,
  username,
  role,
  designation,
  country,
  email,
  dbname
) => {
  let rows;
  const tmpDb = await createDbPath(dbname);
  const transaction = tmpDb.transaction(() => {
    try {
      const currentTimestamp = new Date();
      const query1 = `INSERT INTO staff (staffname,
        contracttype,
        contactno,
        nic,
        designation,
        country,createdAt,email) VALUES (?,?,?,?,?,?,?,?);`;

      const staff = tmpDb
        .prepare(query1)
        .run(
          staffname,
          contracttype,
          contactno,
          nic,
          designation,
          country,
          currentTimestamp.toISOString(),
          email
        );

      const query2 = `INSERT INTO users (staffid,
            username,
            password,
            role,
            country,createdAt,email) VALUES (?,?,?,?,?,?,?);`;

      tmpDb
        .prepare(query2)
        .run(
          staff.lastInsertRowid,
          username,
          hashedPassword,
          role,
          country,
          currentTimestamp.toISOString(),
          email
        );
    } catch (error) {
      console.error("Transaction error:", error);
    }
  });
  transaction();
  return rows;
};
