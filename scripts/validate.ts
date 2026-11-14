import { readFileSync } from "node:fs";
import Ajv from "ajv";

const schema = JSON.parse(readFileSync("data/schema.json", "utf8"));
const data = JSON.parse(readFileSync("data/missions.json", "utf8"));

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

if (!validate(data)) {
  console.error("❌ missions.json is INVALID:");
  console.error(JSON.stringify(validate.errors, null, 2));
  process.exit(1);
}

console.log("✅ missions.json is valid");
