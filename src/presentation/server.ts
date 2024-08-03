import express, { Router } from "express";
import path from "path";

interface options {
  port: number;
  router: Router;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;

  constructor(options: options) {
    const { port, router, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.router = router;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json());

    //* Public Folder

    //* Router
    this.app.use(this.router);

    this.app.use(express.static(this.publicPath));

    //* SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
