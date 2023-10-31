import { join } from "path";
import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import authenticateUser from "../../../lib/authenticate";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let result = authenticateUser(req, res);

  if (!result.props.isauthenticated) {
    res.status(404).end("Image not found");
  }

  const { id } = req.query;

  const imagePath = join("images/", `${id}`); // Update the path
  console.log(imagePath);

  try {
    const image = readFileSync(imagePath);
    res.setHeader("Content-Type", "image/png"); // Adjust content type as needed
    res.status(200).end(image);
  } catch (error) {
    console.log(error);
    res.status(404).end("Image not found");
  }
};
