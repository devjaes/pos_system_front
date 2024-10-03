// pages/api/create-pdf.ts

import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Run the cors middleware
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200,
    });

    // Get the invoice data from the request body
    const invoice = req.body;

    // Make the fetch request to your desired external API
    const response = await fetch("https://invoice-generator.com/ubl", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    });

    if (!response.ok) {
      console.log("No se pudo crear el PDF.");
      return res.status(500).json({ error: "Error en la creación del PDF." });
    }

    const data = await response.json();

    return res.status(200).json(data.data);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Error en la creación del PDF." });
  }
}
