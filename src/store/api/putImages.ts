import AWS from "aws-sdk";
import "dotenv/config";

import { IImagesObject } from "../types/IUserResponses";

const region = "us-east-1";
AWS.config.update({
  region,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Crea una instancia de S3
const s3 = new AWS.S3();

const rekog = new AWS.Rekognition();
const dynamo = new AWS.DynamoDB();

export default async function handler(images: IImagesObject[]) {
  try {
    for (const image of images) {
      const file = image.image; // Lee el archivo de imagen (implementa esta función según tus necesidades)
      await uploadToS3(image.fileName, file, image.productId); // Sube el archivo a S3
    }

    console.log({ message: "Imágenes subidas correctamente" });
    return new Response(
      JSON.stringify({ message: "Imágenes subidas correctamente" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log({ error: "Error al subir las imágenes" }, error);
    return;
  }
}

// Función para subir un archivo a S3
async function uploadToS3(
  fileName: string,
  file: Buffer,
  productId: string
): Promise<void> {
  await s3
    .putObject({
      Bucket: process.env.AWS_BUCKET_NAME as string, // Reemplaza con el nombre de tu bucket de S3
      Key: `products/${fileName}`, // Ruta del archivo en S3
      Body: file, // Contenido del archivo (Buffer)
    })
    .promise();
}

export async function getMatchs(image: Buffer) {
  const res = await rekog
    .searchFacesByImage({
      CollectionId: "lookpay_collection",
      Image: {
        Bytes: image,
      },
    })
    .promise();

  const faceMatches = res.FaceMatches;
  if (!faceMatches) {
    return [];
  }

  const matchs = faceMatches.map(async (faceMatch) => {
    const face = await dynamo
      .getItem({
        TableName: "facerecognition",
        Key: {
          RekognitionId: {
            S: faceMatch.Face?.FaceId as string,
          },
        },
      })
      .promise();

    if (face.Item) {
      if ((faceMatch.Similarity as number) > 99.7) {
        return {
          userId: face.Item.UserId.S,
          similarity: faceMatch.Similarity,
        };
      }
    }
  });

  let matchsResult = Promise.all(matchs).then((values) => {
    return values.filter((value) => value !== undefined);
  });

  return matchsResult;
}

export async function handlerRemove(userId: string) {
  try {
    // Eliminar imágenes del bucket de S3
    const bucketObjects = await s3
      .listObjectsV2({
        Bucket: "lookpay", // Reemplaza con el nombre de tu bucket de S3
        Prefix: `index/${userId}`,
      })
      .promise();

    if (bucketObjects.Contents && bucketObjects.Contents.length > 0) {
      const deletePromises = bucketObjects.Contents.map((object) => {
        return s3
          .deleteObject({
            Bucket: "lookpay", // Reemplaza con el nombre de tu bucket de S3
            Key: object.Key as string,
          })
          .promise();
      });

      await Promise.all(deletePromises);
    }

    // Eliminar imágenes de la colección de Rekognition
    const faceIds: string[] = [];
    const res = await rekog
      .listFaces({
        CollectionId: "lookpay_collection",
        MaxResults: 1000, // Ajusta el número máximo de resultados según tus necesidades
      })
      .promise();

    if (res.Faces) {
      for (const face of res.Faces) {
        if (face.ExternalImageId === userId) {
          faceIds.push(face.FaceId as string);
        }
      }
    }

    if (faceIds.length > 0) {
      await rekog
        .deleteFaces({
          CollectionId: "lookpay_collection",
          FaceIds: faceIds,
        })
        .promise();
    }

    // Eliminar filas de DynamoDB
    const scanResponse = await dynamo
      .scan({
        TableName: "facerecognition",
        FilterExpression: "UserId = :userId",
        ExpressionAttributeValues: {
          ":userId": { S: userId },
        },
      })
      .promise();

    const itemsToDelete = scanResponse.Items;

    if (itemsToDelete && itemsToDelete.length > 0) {
      const deletePromises = itemsToDelete.map((item) => {
        return dynamo
          .deleteItem({
            TableName: "facerecognition",
            Key: {
              RekognitionId: item.RekognitionId,
            },
          })
          .promise();
      });

      await Promise.all(deletePromises);
    }

    console.log({
      message: "Eliminación exitosa de imágenes y filas de DynamoDB",
    });
    return { message: "Eliminación exitosa de imágenes y filas de DynamoDB" };
  } catch (error) {
    console.log(
      { error: "Error al eliminar las imágenes y las filas de DynamoDB" },
      error
    );
    throw error;
  }
}
