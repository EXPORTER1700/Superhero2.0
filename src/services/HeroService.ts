import axios from 'axios';
import { IHero } from 'models/hero';

const BASE_URL = 'https://www.superheroapi.com/api.php/797382658148080';

export class HeroService {
  static async getOneById(id: number): Promise<IHero> {
    const { data } = await axios.get(`${BASE_URL}/${id}`);

    delete data.response;

    return data;
  }

  static async searchByName(name: string): Promise<IHero[]> {
    const { data } = await axios.get(`${BASE_URL}/search/${name}`);

    return data.results;
  }
}
