import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Guid } from '../src/modules/guid/guid.entity';

export class GuidSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await Promise.all([
      em.create(Guid, {
        guid: "02063189EA8C428EAE6A9A763FBECB69",
        user: 'Jhon Doe',
        expires: new Date('2025-08-02T19:30:30.000Z'),
      }),
      em.create(Guid, {
        guid: "EADAE85C022A4DB98349D8C65CE38303",
        user: 'Camilo Montoya',
        expires: new Date('2025-08-02T19:30:30.000Z'),
      }),
      em.create(Guid, {
        guid: "6A0048886C4F40129F3ABD56E54EBDCE",
        user: 'Rick Grimes',
        expires: new Date('2025-08-02T19:30:30.000Z'),
      }),
    ]);
  }
}
