import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { createDbPath, db } from "@/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dbname: any = searchParams.get("dbname");

  let res;
  try {
    const sourcePath = path.join(process.cwd(), "template.db");
    const destinationPath = path.join(process.cwd(), `${dbname}.db`);
    // const destinationPath = path.join(process.cwd(), "dev-copy.db");

    // Create a read stream from the source file
    const sourceStream = fs.createReadStream(sourcePath);

    // Create a write stream to the destination file
    const destinationStream = fs.createWriteStream(destinationPath);

    // Pipe the data from the source stream to the destination stream
    sourceStream.pipe(destinationStream);
    res = { message: "SUCCESS" };
  } catch (error) {
    console.error("Error adding new staff:", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const { dbname, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  let message: string = "SUCCESS";
  try {
    const tmpDb = await createDbPath(dbname);
    // console.log("tmpDb", tmpDb);
    const query1 = `INSERT INTO organizations (name,
      organizationname,
      country,
      address,
      email,
      contactno,
      adminusername,status) VALUES (?,?,?,?,?,?,?,?);`;

    tmpDb
      .prepare(query1)
      .run(
        "name",
        "organizationname",
        "country",
        "address",
        "email",
        "contactno",
        "adminusername",
        hashedPassword
      );
  } catch (error) {
    console.error("Error adding new Organization:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}
