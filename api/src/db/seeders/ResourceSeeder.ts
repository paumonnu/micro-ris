import db from '@db/db.js';

abstract class ResourceSeeder {
  // Seed resource
  async seed(qty: number) {
    for (let i = 0; i < qty; i++) {
      await this.resourceFactory();
    }

    await db.destroy();
  }

  // Return model data to seed
  protected async resourceFactory(): Promise<any> {}
}

export default ResourceSeeder;
