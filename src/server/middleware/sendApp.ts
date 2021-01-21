import fs from 'fs';
import { Request, Response } from 'express';

export const sendApp = () => {
  return (_req: Request, res: Response, _next: () => void) => {
    let js;
    try {
      js = JSON.parse(
        (fs.readFileSync(
          __dirname + '/../public/build/manifest.json'
        ) as unknown) as string
      )['app.js'];
    } catch (error) {
      console.log(error);
    }

    res.send(
      `<!DOCTYPE html>
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>DevTrivia</title>
         </head>
         <body>
             <div id="root"></div>
             </script>
             <script src="/build${js}"></script>
         </body>
         </html>`
    );
  };
};
