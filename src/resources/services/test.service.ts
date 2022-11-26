import { NotFoundException } from '../../utils/exceptions';

export class TestService {
  /**
   * On copie localement les animaux pour pouvoir insérer, supprimer etc
   */
  pets: Test[] = pets;

  /**
   * Trouve tous les animaux
   */
  findAll(): Test[] {
    return this.pets;
  }

  /**
   * Trouve un animal en particulier
   * @param id - ID unique de l'animal
   */
  findOne(id: number): Test | undefined {
    return this.pets.find((pet) => pet.id === id);
  }

  /**
   * Met à jour un animal en particulier
   *
   * /!\ Idéalement, il faudrait vérifier le contenu de la requête avant de le sauvegarder.
   *
   * @param petData - Un objet correspondant à un animal, il ne contient pas forcément tout un animal. Attention, on ne prend pas l'id avec.
   * @param id - ID unique de l'animal
   */
  update(petData: Partial<Test>, id: number): Test | undefined {
    const index = this.pets.findIndex((pet) => pet.id === id);

    if (index === -1) {
      throw new NotFoundException('Animal introuvable');
    }

    /* On ne met jamais l'id à jour */
    delete petData.id;

    this.pets[index] = { ...this.pets[index], ...petData };
    return this.pets[index];
  }

  /**
   * Créé un animal
   *
   * /!\ Idéalement, il faudrait vérifier le contenu de la requête avant de le sauvegarder.
   *
   * @param petData - Un objet correspondant à un animal. Attention, on ne prend pas l'id avec.
   */
  create(petData: Omit<Test, 'id'>): Test {
    const newTest: Test = {
      ...petData,
      /* /!\ Ne pas faire ceci dans un vrai projet */
      id: Math.floor(Math.random() * 100)
    };

    this.pets.push(newTest);
    return newTest;
  }

  /**
   * Suppression d'un animal
   */
  delete(id: number) {
    this.pets = this.pets.filter((pet) => pet.id !== id);
  }
}

export const pets: Test[] = [
  { id: 1, name: 'Snoopy', type: 'dog' },
  { id: 2, name: 'Pepper', type: 'cat' },
  { id: 3, name: 'Whisky', type: 'dog' },
  { id: 4, name: 'Tiplouf', type: 'cat' }
];

export type TestCategory = 'cat' | 'dog';

export interface Test {
  id: number;
  name: string;
  type: TestCategory;
}
